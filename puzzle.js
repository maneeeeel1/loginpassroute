// Snippets de código para poder componer el programa

//Usado?: y
  const middlewares = require('./middlewares');
//--- Explicación: Lo necesitamos requerir en el routes.js para acceder a parametros como req.session.palabrasecreta...

// -------------------------------------------------------------------------------------

//Usado?: y
const bodyParser = require('body-parser');
//--- Explicación: requerimos body parse para procesar datos de solicitudes, en este caso datos de formulario.

// -------------------------------------------------------------------------------------

//Usado?: y 
const session = require('express-session');
//--- Explicación:  requerimos express-session para almacenar los datos de sesion.

// -------------------------------------------------------------------------------------

//Usado?: y
const express = require('express');
//--- Explicación:requerir express en app.js

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: 
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: y
const dotenv = require('dotenv');
//--- Explicación: segun he entendido, carga variables de entorno de un archivo .env en Node.js

// -------------------------------------------------------------------------------------

//Usado?: y
const middlewares = require('./middlewares');
//--- Explicación: para poder exportar el codigo de esa ruta, hay que requerirla en app.js

// -------------------------------------------------------------------------------------

//Usado?: y
const routes = require('./routes');
//--- Explicación:  para poder exportar el codigo de esa ruta, hay que requerirla en app.js

// -------------------------------------------------------------------------------------

//Usado?: y
dotenv.config();
//--- Explicación: invocamos para que pueda leer el .env y utilizarlo cuando se necesario.

// -------------------------------------------------------------------------------------

//Usado?: y
const app = express();
//--- Explicación: invocar express en app.js

// -------------------------------------------------------------------------------------

//Usado?: y
const PORT = 4000;
//--- Explicación: hacemos variable del puerto para usarla despues en el app.listen

// -------------------------------------------------------------------------------------

//Usado?: 
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:y
middlewares.setupApp(app);
//--- Explicación: ejecuta la funcion especificada, con el argumento app

// -------------------------------------------------------------------------------------

//Usado?:y
routes.setup(app);
//--- Explicación: ejecuta la funcion especificada, con el argumento app

// -------------------------------------------------------------------------------------

//Usado?:y
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: hacemos una funcion en la que, guardamos la palabra secreta. Si lo escrito en el formulario es igual a la palabra correcta, guarda la palabra para la sesion y siguiente paso. En caso de no ser iguales, te redirige a un error.


// -------------------------------------------------------------------------------------


//Usado?: y 
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: se utiliza en el routes para definir la ruta raiz, luego define los dos tipos de mensajes de error con los parametros de la URL y por ultimo, si la sesion esta activa, te redirige a /profile.


// -------------------------------------------------------------------------------------


//Usado?: y
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: HTML de inicio de sesion con el formulario a rellenar.


// -------------------------------------------------------------------------------------

//Usado: y
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//---Explicación: creamos function setupAPP con el argumento app. La primera linea se encarga de manejar los datos del formulario en este caso. Y el session, habilita las sesiones en Express. 

//Usado?:y
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: definimos aqui el /profile, con el middleware que verifique la sesion, y su html correspondiente para hacer un log out.

// -------------------------------------------------------------------------------------

//Usado?:
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: y
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: levantar servidor utilizando el puerto escogido antes

// -------------------------------------------------------------------------------------

//Usado?:y
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: otra funcion que nos dice, si la palabra secreta es la correcta para iniciar la session, pasa al siguiente paso. En caso de no serlo, error!

// -------------------------------------------------------------------------------------


//Usado?:
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?:y
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: cuando pulsamos el Log Out, se destruye la sesion con req.session.destroy, se le pasa el argumento err para definir un error en caso de fallar el log out. Una vez cerrada sesion te redirige a la raiz /.

// -------------------------------------------------------------------------------------

//Usado?: y
module.exports = {
  setup,
};
//--- Explicación: para poder exportar setup de routes.js donde queramos

// -------------------------------------------------------------------------------------

//Usado?: y
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: para poder exportar cada una de las funciones de middleware.js donde queramos

// -------------------------------------------------------------------------------------

