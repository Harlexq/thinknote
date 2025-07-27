import { ValidationError } from "elysia";

interface ParsedError {
  field: string;
  message: string;
  value?: any;
}

interface ValidationRule {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  enum?: string[];
  custom?: (value: any) => string | null;
}

interface FieldConfig {
  label: string;
  rules?: ValidationRule;
  messages?: Record<string, string>;
}

export class ValidationErrorParser {
  private static readonly fieldConfigs: Record<string, FieldConfig> = {
    email: {
      label: "Email adresi",
      rules: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      messages: {
        format: "Geçerli bir email adresi giriniz.",
        pattern: "Geçerli bir email adresi giriniz.",
      },
    },
    password: {
      label: "Şifre",
      rules: {
        minLength: 8,
      },
    },
    confirmPassword: {
      label: "Şifre tekrarı",
      rules: {
        minLength: 8,
      },
      messages: {
        match: "Şifreler eşleşmiyor.",
      },
    },
    firstName: {
      label: "Ad",
      rules: {
        minLength: 2,
        maxLength: 50,
      },
    },
    lastName: {
      label: "Soyad",
      rules: {
        minLength: 2,
        maxLength: 50,
      },
    },
    phoneNumber: {
      label: "Telefon numarası",
      rules: {
        pattern: /^[0-9\s\-\(\)]+$/,
      },
    },
    phoneCountryId: {
      label: "Ülke kodu",
      messages: {
        required: "Ülke seçimi zorunludur.",
        invalid: "Geçerli bir ülke seçiniz.",
      },
    },
    code: {
      label: "Doğrulama kodu",
      rules: {
        pattern: /^[0-9]{6}$/,
        minLength: 6,
        maxLength: 6,
      },
      messages: {
        pattern: "Doğrulama kodu 6 haneli bir sayı olmalıdır.",
      },
    },
    refreshToken: {
      label: "Oturum anahtarı",
    },
  };

  private static readonly defaultMessages: Record<
    string,
    (field: string, rule?: any) => string
  > = {
    required: (field) => `${field} zorunludur.`,
    format: (field) => `Geçerli bir ${field.toLowerCase()} giriniz.`,
    minLength: (field, minLength) =>
      `${field} en az ${minLength || "?"} karakter olmalıdır.`,
    maxLength: (field, maxLength) =>
      `${field} en fazla ${maxLength || "?"} karakter olmalıdır.`,
    min: (field, min) => `${field} en az ${min || "?"} olmalıdır.`,
    max: (field, max) => `${field} en fazla ${max || "?"} olmalıdır.`,
    pattern: (field) => `${field} formatı geçersiz.`,
    enum: (field, values) =>
      `${field} şu değerlerden biri olmalıdır: ${values?.join(", ") || "?"}`,
    invalid: (field) => `${field} geçersiz.`,
    unique: (field) => `Bu ${field.toLowerCase()} zaten kullanılıyor.`,
    match: (field) => `${field} eşleşmiyor.`,
  };

  static parse(error: any): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    try {
      console.log("🔍 Parsing validation error:", error);

      // Elysia ValidationError
      if (error instanceof ValidationError) {
        console.log("📋 ValidationError detected, type:", error.type);
        const parsedErrors = this.parseElysiaError(error);
        parsedErrors.forEach(({ field, message }) => {
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field].push(message);
        });
      }
      // Elysia error object check (type: 47 gibi)
      else if (error?.type === 47 || (error?.all && Array.isArray(error.all))) {
        console.log("📋 Elysia validation error object detected");
        const parsedErrors = this.parseElysiaErrorObject(error);
        parsedErrors.forEach(({ field, message }) => {
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field].push(message);
        });
      }
      // Custom validation errors
      else if (error?.validationErrors) {
        console.log("📋 Custom validation errors detected");
        Object.entries(error.validationErrors).forEach(([field, messages]) => {
          errors[field] = Array.isArray(messages)
            ? messages
            : [messages as string];
        });
      }
      // MongoDB duplicate key error
      else if (error?.code === 11000) {
        console.log("📋 MongoDB duplicate key error detected");
        const field = this.extractDuplicateField(error);
        errors[field] = [this.getMessage(field, "unique")];
      }
      // Default error
      else {
        console.log("📋 Default error handling");
        errors.general = [error?.message || "Validation hatası oluştu."];
      }
    } catch (e) {
      console.error("❌ Error parsing validation error:", e);
      errors.general = ["Validation hatası oluştu."];
    }

    console.log("📤 Parsed errors:", errors);
    return errors;
  }

  private static parseElysiaError(error: ValidationError): ParsedError[] {
    const parsedErrors: ParsedError[] = [];

    console.log("🔄 Parsing Elysia ValidationError:", {
      message: error.message,
      all: error.all,
      type: error.type,
    });

    // Check if all property exists and is array
    if (error.all && Array.isArray(error.all)) {
      error.all.forEach((err: any, index: number) => {
        console.log(`📝 Processing error ${index}:`, err);

        const field = this.extractFieldFromElysiaError(err);
        const validationType = this.detectValidationTypeFromElysiaError(err);
        const message =
          err.schema?.error || this.getMessage(field, validationType, err);

        parsedErrors.push({ field, message });
      });
    } else {
      // Fallback for message parsing
      const errorStr = error.message || error.toString();
      const field = this.extractFieldFromMessage(errorStr);
      const message = this.getMessage(field, "invalid");
      parsedErrors.push({ field, message });
    }

    return parsedErrors;
  }

  private static parseElysiaErrorObject(error: any): ParsedError[] {
    const parsedErrors: ParsedError[] = [];

    if (error.all && Array.isArray(error.all)) {
      error.all.forEach((err: any) => {
        const field = this.extractFieldFromElysiaError(err);
        const validationType = this.detectValidationTypeFromElysiaError(err);
        const message =
          err.schema?.error || this.getMessage(field, validationType, err);
        parsedErrors.push({ field, message });
      });
    }

    return parsedErrors;
  }

  private static extractFieldFromElysiaError(error: any): string {
    // Try different path formats
    if (error.path) {
      // Remove leading slash and clean path
      const cleanPath = error.path
        .toString()
        .replace(/^\//, "")
        .replace(/^body\./, "")
        .replace(/^query\./, "")
        .replace(/^params\./, "")
        .replace(/^headers\./, "");

      if (cleanPath) {
        const parts = cleanPath.split(".");
        return parts[parts.length - 1] || "general";
      }
    }

    // Try property name
    if (error.property) {
      return error.property;
    }

    // Try summary for field info
    if (error.summary && typeof error.summary === "string") {
      const match = error.summary.match(/property\s+'([^']+)'/i);
      if (match) {
        return match[1];
      }
    }

    return "general";
  }

  private static extractFieldFromMessage(message: string): string {
    // Try to extract field from error message
    const patterns = [
      /property\s+'\/([^']+)'/i,
      /field\s+'([^']+)'/i,
      /at\s+([a-zA-Z0-9_]+)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return "general";
  }

  private static detectValidationTypeFromElysiaError(error: any): string {
    // Check error type codes
    const typeMap: Record<number, string> = {
      14: "required",
      15: "format",
      52: "minLength",
      53: "maxLength",
      54: "pattern",
      45: "enum",
      46: "min",
      47: "max",
    };

    if (error.type && typeMap[error.type]) {
      return typeMap[error.type];
    }

    // Check message for hints
    const message = (error.message || error.summary || "").toLowerCase();
    if (message.includes("required")) return "required";
    if (message.includes("email") || message.includes("format"))
      return "format";
    if (message.includes("min") && message.includes("length"))
      return "minLength";
    if (message.includes("max") && message.includes("length"))
      return "maxLength";
    if (message.includes("pattern")) return "pattern";
    if (message.includes("enum")) return "enum";

    return "invalid";
  }

  private static getMessage(
    field: string,
    validationType: string,
    error?: any
  ): string {
    const config = this.fieldConfigs[field];
    const fieldLabel = config?.label || this.humanizeField(field);

    // Check for custom message in field config
    if (config?.messages?.[validationType]) {
      return config.messages[validationType];
    }

    // Get rule value for the message
    let ruleValue: any;
    if (config?.rules) {
      ruleValue = config.rules[validationType as keyof ValidationRule];
    }

    // Extract rule value from error if available
    if (!ruleValue && error) {
      if (error.expected !== undefined) ruleValue = error.expected;
      if (error.minimum !== undefined) ruleValue = error.minimum;
      if (error.maximum !== undefined) ruleValue = error.maximum;
    }

    // Use default message generator
    const messageGenerator = this.defaultMessages[validationType];
    if (messageGenerator) {
      return messageGenerator(fieldLabel, ruleValue);
    }

    // Fallback
    return `${fieldLabel} geçersiz.`;
  }

  private static humanizeField(field: string): string {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  private static extractDuplicateField(error: any): string {
    const message = error.message || "";
    const keyPattern = /index:\s+(\w+)_/;
    const match = message.match(keyPattern);
    return match ? match[1] : "field";
  }

  static addFieldConfig(field: string, config: FieldConfig): void {
    this.fieldConfigs[field] = config;
  }

  static addDefaultMessage(
    type: string,
    messageGenerator: (field: string, rule?: any) => string
  ): void {
    this.defaultMessages[type] = messageGenerator;
  }
}
