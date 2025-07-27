import { ValidationError } from "elysia";

export function formatValidationErrors(
  error: ValidationError
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  if (error.all && Array.isArray(error.all)) {
    error.all.forEach((err) => {
      if ("path" in err && "message" in err) {
        const field = err.path.replace("/", "") || "general";
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(err.message);
      }
    });
  }

  return errors;
}
