const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestión de Tareas',
    version: '1.0.0',
    description: 'Documentación de la API usando Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {},

};

const options = {
  swaggerDefinition,
  apis: ['./src/api/task.js'], 
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
