const express = require('express');
const path = require('path');

const app = express();

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
app.set('views', path.join(__dirname, 'views'));
app.set('api', path.join(__dirname, 'api'));