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
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
    "/auth/register": {
      post: {
        summary: "Register",
        headers: {
          "Set-Cookie": {
            description: "The access token.",
            schema: {
              type: "string",
            },
          },
        },
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
            headers: {
              "Set-Cookie": {
                description: "The access token.",
                schema: {
                  type: "string",
                },
              },
            },
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
    "/trainers/{id}": {
      get: {
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
        security: [{ cookieAuth: [] }],
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
    "/bag/{id}": {
      get: {
        security: [{ cookieAuth: [] }],
        summary: "Get a bag by ID",
        tags: ["Bags"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "The bag ID.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "A bag.",
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
                      $ref: "#/definitions/Bag",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/bag/trainer/{id}": {
      get: {
        security: [{ cookieAuth: [] }],
        summary: "Get a bag by trainer ID",
        tags: ["Bags"],
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
            description: "A bag.",
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
                      $ref: "#/definitions/Bag",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/bag": {
      post: {
        security: [{ cookieAuth: [] }],
        summary: "Add a bag",
        tags: ["Bags"],
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
    "/bag/item": {
      post: {
        security: [{ cookieAuth: [] }],
        summary: "Add an item to a bag",
        tags: ["Bags"],
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
        security: [{ cookieAuth: [] }],
        summary: "Remove an item from a bag",
        tags: ["Bags"],
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
    "/bag/items": {
      post: {
        security: [{ cookieAuth: [] }],
        summary: "Add items to a bag",
        tags: ["Bags"],
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
      name: "Auth",
      description: "Endpoints to authenticate users.",
    },
    {
      name: "Pokemons",
      description: "GET Endpoints to get pokemons.",
    },
    {
      name: "Trainers",
      description: "Endpoints to manage trainers.",
    },
    {
      name: "Bags",
      description: "Endpoints to manage bags.",
    }
  ],
};
