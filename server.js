const express = require('express');
const app = express();
const server = app.listen(3008, encender);

function encender() {
  console.log('Servidor encendido');
}

app.use(express.static('public'));