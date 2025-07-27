// src/swagger/schemas/auth.schemas.ts
export const authSchemas = {
  // Base response schemas
  successResponse: {
    type: "object" as const,
    properties: {
      status: {
        type: "boolean" as const,
        example: true,
      },
      message: {
        type: "string" as const,
      },
      data: {
        type: "object" as const,
        nullable: true,
      },
    },
    required: ["status", "message", "data"],
  },
  errorResponse: {
    type: "object" as const,
    properties: {
      status: {
        type: "boolean" as const,
        example: false,
      },
      message: {
        type: "string" as const,
      },
      data: {
        type: "object" as const,
        nullable: true,
        example: null,
      },
      errors: {
        type: "object" as const,
        additionalProperties: {
          type: "array" as const,
          items: {
            type: "string" as const,
          },
        },
      },
    },
    required: ["status", "message", "data"],
  },
  // Data schemas
  tokensData: {
    type: "object" as const,
    properties: {
      accessToken: {
        type: "string" as const,
        description: "JWT access token for API authentication",
      },
      refreshToken: {
        type: "string" as const,
        description: "JWT refresh token for obtaining new access tokens",
      },
      maxAge: {
        type: "number" as const,
        description: "Token expiry time in seconds",
        example: 604800, // 7 gün
      },
    },
    required: ["accessToken", "refreshToken", "maxAge"],
  },
};

// Swagger documentation objects
export const authDocs = {
  register: {
    tags: ["auth"],
    summary: "Register a new user",
    description:
      "Create a new user account and receive authentication tokens. A verification code will be sent to the email address.",
    responses: {
      201: {
        description: "User successfully registered",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                status: {
                  type: "boolean" as const,
                  example: true,
                },
                message: {
                  type: "string" as const,
                  example:
                    "Kayıt başarılı. Email adresinize gönderilen kodu doğrulayınız.",
                },
                data: authSchemas.tokensData,
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      400: {
        description: "Bad request - Email already exists or validation error",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
    },
  },
  verifyEmail: {
    tags: ["auth"],
    summary: "Verify email address",
    description:
      "Verify email address using the 6-digit code sent to the email",
    responses: {
      200: {
        description: "Email verified successfully",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                status: {
                  type: "boolean" as const,
                  example: true,
                },
                message: {
                  type: "string" as const,
                  example: "Email adresiniz başarıyla doğrulandı",
                },
                data: {
                  type: "object" as const,
                  nullable: true,
                  example: null,
                },
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      400: {
        description:
          "Bad request - Invalid code, expired code, or email already verified",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
    },
  },
  resendVerification: {
    tags: ["auth"],
    summary: "Resend verification code",
    description:
      "Resend the email verification code to the registered email address",
    responses: {
      200: {
        description: "Verification code resent successfully",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                status: {
                  type: "boolean" as const,
                  example: true,
                },
                message: {
                  type: "string" as const,
                  example: "Doğrulama kodu tekrar gönderildi",
                },
                data: {
                  type: "object" as const,
                  nullable: true,
                  example: null,
                },
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      400: {
        description: "Bad request - User not found or email already verified",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
    },
  },
  login: {
    tags: ["auth"],
    summary: "Login user",
    description:
      "Authenticate user with email and password to receive tokens. Email must be verified.",
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                status: {
                  type: "boolean" as const,
                  example: true,
                },
                message: {
                  type: "string" as const,
                  example: "Giriş başarılı.",
                },
                data: authSchemas.tokensData,
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      401: {
        description:
          "Unauthorized - Invalid credentials, account deactivated, or email not verified",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
    },
  },
  refresh: {
    tags: ["auth"],
    summary: "Refresh access token",
    description: "Use refresh token to obtain new access and refresh tokens",
    responses: {
      200: {
        description: "Tokens refreshed successfully",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                status: {
                  type: "boolean" as const,
                  example: true,
                },
                message: {
                  type: "string" as const,
                  example: "Token yenileme başarılı.",
                },
                data: authSchemas.tokensData,
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      401: {
        description: "Unauthorized - Invalid or expired refresh token",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
    },
  },
  logout: {
    tags: ["auth"],
    summary: "Logout user",
    description: "Logout from current device by invalidating the refresh token",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Logout successful",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                status: {
                  type: "boolean" as const,
                  example: true,
                },
                message: {
                  type: "string" as const,
                  example: "Çıkış işlemi başarılı.",
                },
                data: {
                  type: "object" as const,
                  nullable: true,
                  example: null,
                },
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      400: {
        description: "Bad request",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
      401: {
        description: "Unauthorized - Invalid or missing access token",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
    },
  },
  logoutAll: {
    tags: ["auth"],
    summary: "Logout from all devices",
    description: "Invalidate all refresh tokens for the authenticated user",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Successfully logged out from all devices",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                status: {
                  type: "boolean" as const,
                  example: true,
                },
                message: {
                  type: "string" as const,
                  example: "Tüm cihazlardan çıkış yapıldı.",
                },
                data: {
                  type: "object" as const,
                  nullable: true,
                  example: null,
                },
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      401: {
        description: "Unauthorized - Invalid or missing access token",
        content: {
          "application/json": {
            schema: authSchemas.errorResponse,
          },
        },
      },
    },
  },
};
