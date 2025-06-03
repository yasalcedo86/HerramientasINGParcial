const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const app = require('./app');
const admin = require("firebase-admin");
const express = require('express');
const taskRoutes = require('./api/task');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/tasks', taskRoutes);


