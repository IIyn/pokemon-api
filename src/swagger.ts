import env from "@/config/env";

const { PORT, HOST } = env;

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "POKéMON API",
    version: "1.0.0",
    description: "Express and Typescript API",
  },
  servers: [
    {
      url: `http://${HOST}:${PORT}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearer: "JWT",
      },
    },
  },
  definitions: {
    Pokemon: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "The pokemon ID.",
        },
        name: {
          type: "object",
          description: "The pokemon's names.",
          properties: {
            english: {
              type: "string",
            },
            japanese: {
              type: "string",
            },
            chinese: {
              type: "string",
            },
            french: {
              type: "string",
            },
          },
        },
        type: {
          type: "array",
          items: {
            type: "string",
          },
        },
        base: {
          type: "object",
          properties: {
            HP: {
              type: "integer",
            },
            Attack: {
              type: "integer",
            },
            Defense: {
              type: "integer",
            },
            "Sp. Attack": {
              type: "integer",
            },
            "Sp. Defense": {
              type: "integer",
            },
            Speed: {
              type: "integer",
            },
          },
        },
      },
    },
  },
  paths: {
    "/pokemons": {
      get: {
        summary: "Get all pokemons",
        tags: ["GET endpoints"],
        responses: {
          "200": {
            description: "A list of pokemons.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/definitions/Pokemon",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/pokemons/{id}": {
      get: {
        summary: "Get a pokemon by ID",
        tags: ["GET endpoints"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "The pokemon ID.",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "A pokemon.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                    },
                    data: {
                      type: "object",
                      $ref: "#/definitions/Pokemon",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/pokemons/randoms/{set}": {
      get: {
        summary: "Get a set of random pokemons",
        tags: ["GET endpoints"],
        parameters: [
          {
            name: "set",
            in: "path",
            required: true,
            description: "The number of pokemons to get.",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of pokemons.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/definitions/Pokemon",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Login",
        tags: ["Auth"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "A token.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        summary: "Logout",
        tags: ["Auth"],
        responses: {
          "200": {
            description: "A message.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/register": {
      post: {
        summary: "Register",
        tags: ["Auth"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "A message.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: "GET endpoints",
      description: "GET Endpoints to get pokemons.",
    },
    {
      name: "POST endpoints",
      description: "POST Endpoints to create pokemons.",
    },
    {
      name: "PUT endpoints",
      description: "PUT Endpoints to update pokemons.",
    },
    {
      name: "DELETE endpoints",
      description: "DELETE Endpoints to delete pokemons.",
    },
    {
      name: "Auth",
      description: "Endpoints to authenticate users.",
    },
  ],
};
