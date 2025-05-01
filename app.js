const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 4000;

const middlewares = require('./middlewares');
const routes = require('./routes');

middlewares.setupAPP(app);
routes.setup(app);



app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });

