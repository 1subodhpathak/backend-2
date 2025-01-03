import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Account Management API',
      version: '1.0.0',
      description: 'API documentation for Account Management System\n\nAuthentication:\n- API Key (Required for all endpoints): Send as "x-api-key" header\n- JWT Token (Required for protected endpoints): Send as "Bearer" token in Authorization header',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://matrimoney-backend.vercel.app/api'
          : 'http://localhost:3000/api',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      }
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints including login, registration, password management'
      },
      {
        name: 'Account',
        description: 'Account management endpoints including profile updates and photo management'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'API key required for all endpoints'
        },
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token required for protected endpoints'
        }
      },
      schemas: {
        AccountUpdate: {
          type: 'object',
          properties: {
            primary_phone: {
              type: 'string',
              example: '1234567890'
            },
            primary_phone_country: {
              type: 'string',
              example: 'US'
            },
            primary_phone_type: {
              type: 'string',
              enum: ['MOBILE', 'HOME', 'WORK']
            },
            secondary_phone: {
              type: 'string',
              example: '0987654321'
            },
            secondary_phone_country: {
              type: 'string',
              example: 'US'
            },
            secondary_phone_type: {
              type: 'string',
              enum: ['MOBILE', 'HOME', 'WORK']
            },
            first_name: {
              type: 'string',
              example: 'John'
            },
            last_name: {
              type: 'string',
              example: 'Doe'
            },
            middle_name: {
              type: 'string',
              example: 'Smith'
            },
            birth_date: {
              type: 'string',
              format: 'date',
              example: '1990-01-01'
            },
            gender: {
              type: 'string',
              enum: ['M', 'F', 'O']
            },
            address_line1: {
              type: 'string',
              example: '123 Main St'
            },
            address_line2: {
              type: 'string',
              example: 'Apt 4B'
            },
            city: {
              type: 'string',
              example: 'New York'
            },
            state: {
              type: 'string',
              example: 'NY'
            },
            zip: {
              type: 'string',
              example: '10001'
            },
            country: {
              type: 'string',
              example: 'US'
            },
            secret_question: {
              type: 'string',
              example: 'What is your pet\'s name?'
            },
            secret_answer: {
              type: 'string',
              example: 'Max'
            },
            driving_license: {
              type: 'string',
              example: 'DL123456'
            }
          }
        },
        PhotoUpload: {
          type: 'object',
          required: ['photo'],
          properties: {
            photo: {
              type: 'string',
              format: 'binary',
              description: 'Profile photo (max 5MB, image files only)'
            }
          }
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'], // Include both TS and JS paths
};

export const specs = swaggerJsdoc(options); 