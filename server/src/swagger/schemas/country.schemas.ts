export const countrySchemas = {
  country: {
    type: "object" as const,
    properties: {
      id: {
        type: "number" as const,
        description: "Country ID",
        example: 1,
      },
      name: {
        type: "string" as const,
        description: "Country name",
        example: "Turkey",
      },
      code: {
        type: "string" as const,
        description: "Country phone code",
        example: "+90",
      },
      iso: {
        type: "string" as const,
        description: "ISO 3166-1 alpha-2 country code",
        example: "TR",
      },
      flag: {
        type: "string" as const,
        description: "URL to country flag SVG",
        example: "https://cdn.kcak11.com/CountryFlags/countries/tr.svg",
      },
      mask: {
        oneOf: [
          {
            type: "string" as const,
            description: "Phone number mask pattern",
            example: "(###) ### ## ##",
          },
          {
            type: "array" as const,
            items: {
              type: "string" as const,
            },
            description: "Multiple phone number mask patterns",
            example: ["(###) ### ## ##", "### ### ## ##"],
          },
        ],
      },
    },
    required: ["id", "name", "code", "iso", "flag", "mask"],
  },
  countriesList: {
    type: "object" as const,
    properties: {
      countries: {
        type: "array" as const,
        items: {
          $ref: "#/components/schemas/Country",
        },
      },
      total: {
        type: "number" as const,
        description: "Total number of countries",
        example: 250,
      },
    },
    required: ["countries", "total"],
  },
};

export const countryDocs = {
  getAll: {
    tags: ["countries"],
    summary: "Get all countries",
    description:
      "Retrieve a list of all countries with their phone codes, ISO codes, flags, and phone number masks. Supports search functionality.",
    responses: {
      200: {
        description: "Countries retrieved successfully",
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
                  example: "Ülkeler başarıyla getirildi.",
                },
                data: countrySchemas.countriesList,
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },
    },
  },
  getByIso: {
    tags: ["countries"],
    summary: "Get country by ISO code",
    description: "Retrieve a specific country by its ISO 3166-1 alpha-2 code",
    responses: {
      200: {
        description: "Country retrieved successfully",
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
                  example: "Ülke başarıyla getirildi.",
                },
                data: countrySchemas.country,
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      404: {
        description: "Country not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },
    },
  },
  getByCode: {
    tags: ["countries"],
    summary: "Get country by phone code",
    description:
      "Retrieve a specific country by its international dialing code",
    responses: {
      200: {
        description: "Country retrieved successfully",
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
                  example: "Ülke başarıyla getirildi.",
                },
                data: countrySchemas.country,
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
      404: {
        description: "Country not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },
    },
  },
};
