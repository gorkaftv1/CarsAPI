const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cars API',
      version: '1.0.0',
      description: 'API para gestión de vehículos',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'API',
      }
    ],
    tags: [
      {
        name: 'Cars',
        description: 'Endpoints para gestión de vehículos',
      },
      {
        name: 'Health',
        description: 'Endpoints de estado del servidor',
      },
    ],
  },
  apis: ['./src/routes/*.js', './app.js'], // Archivos donde están las anotaciones
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};