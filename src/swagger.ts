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
          properties: {
            english: { type: "string" },
            japanese: { type: "string" },
            chinese: { type: "string" },
            french: { type: "string" },
          },
        },
        type: {
          type: "array",
          items: { type: "string" },
        },
        base: {
          type: "object",
          properties: {
            HP: { type: "integer" },
            Attack: { type: "integer" },
            Defense: { type: "integer" },
            "Sp. Attack": { type: "integer" },
            "Sp. Defense": { type: "integer" },
            Speed: { type: "integer" },
          },
        },
        species: { type: "string" },
        description: { type: "string" },
        evolution: {
          type: "object",
          properties: {
            next: {
              type: "array",
              items: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        },
        profile: {
          type: "object",
          properties: {
            height: { type: "string" },
            weight: { type: "string" },
            egg: {
              type: "array",
              items: { type: "string" },
            },
            ability: {
              type: "array",
              items: {
                type: "array",
                items: { type: "string" },
              },
            },
            gender: { type: "string" },
          },
        },
        image: {
          type: "object",
          properties: {
            sprite: { type: "string" },
            thumbnail: { type: "string" },
            hires: { type: "string" },
          },
        },
      },
    },
    Trainer: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The trainer ID.",
        },
        name: {
          type: "string",
          description: "The trainer's name.",
        },
        userId: {
          type: "string",
          description: "The user ID.",
        },
        pokemonIds: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
  paths: {
    "/pokemons": {
      get: {
        summary: "Get all pokemons",
        tags: ["Pokemons"],
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
        tags: ["Pokemons"],
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
        tags: ["Pokemons"],
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
    "/trainers/{id}": {
      get: {
        summary: "Get a trainer by ID",
        tags: ["Trainers"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "The trainer ID.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "A trainer.",
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
                      $ref: "#/definitions/Trainer",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/trainers/user/{id}": {
      get: {
        summary: "Get a trainer by user ID",
        tags: ["Trainers"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "The user ID.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "A trainer.",
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
                      $ref: "#/definitions/Trainer",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/trainers/me": {
      get: {
        summary: "Get self trainers",
        tags: ["Trainers"],
        responses: {
          "200": {
            description: "A list of trainers.",
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
                        $ref: "#/definitions/Trainer",
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
    "/trainers": {
      post: {
        summary: "Add a trainer",
        tags: ["Trainers"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/definitions/Trainer",
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
    "/trainers/pokemon": {
      post: {
        summary: "Add a pokemon to a trainer",
        tags: ["Trainers"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  trainerId: {
                    type: "string",
                  },
                  pokemonId: {
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
      delete: {
        summary: "Remove a pokemon from a trainer",
        tags: ["Trainers"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  trainerId: {
                    type: "string",
                  },
                  pokemonId: {
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
    "/trainers/team": {
      post: {
        summary: "Add a team to a trainer",
        tags: ["Trainers"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  trainerId: {
                    type: "string",
                  },
                  teamId: {
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
      name: "Pokemons",
      description: "GET Endpoints to get pokemons.",
    },
    {
      name: "Auth",
      description: "Endpoints to authenticate users.",
    },
    {
      name: "Trainers",
      description: "Endpoints to manage trainers.",
    },
  ],
};
