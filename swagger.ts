import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerOptions: {
    authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "<JWT>"} }
  },
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogging Platform API',
      version: '1.0.0',
      description: 'API documentation for the Blogging Platform',
    },
    basePath: '/',
    "securityDefinitions": {
      "Authorization": {
      "type": "apiKey",
      "name": "authorization",
      "in": "header",
      "description": "Authentication token"
    }
  },
    "components": {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT" 
        }
      },
      "schemas": {
        "Post": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "content": {
              "type": "string"
            },
            "author": {
              "type": "string"
            }
          },
          "required": ["title", "content", "author"],
          "example": {
            "title": "Example Blog Post",
            "content": "This is an example content.",
            "author": "John Doe"
          }
        }
      }
    },
    "paths": {
      "/api/posts": {
        "post": {
          "summary": "Create a new blog post",
          "tags": ["Blog Posts"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Post"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The created blog post",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Post"
                  }
                }
              }
            },
            "500": {
              "description": "Server error"
            }
          },
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "x-code-samples": [
            {
              "lang": "http",
              "source": {
                "headers": {
                  "Authorization": "YOUR_TOKEN_HERE"
                },
                "body": {
                  "title": "Example Blog Post",
                  "content": "This is an example content.",
                  "author": "John Doe"
                }
              }
            }
          ]
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export default (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
