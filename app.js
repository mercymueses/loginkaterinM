const express = require('express')
const app = express()
const port = 3000
// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')
const session = require('express-session')

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}))
app.use(session({
  secret:'asdlfkfso3234o231sdflasdfasdfasdfoasdf'
}))

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'loginkaterin',
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login',async (req, res) => { //req = request, peticion; res = response, respuesta
  const datos = req.query;
  // A simple SELECT query
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
      [datos.usuario, datos.clave]
    );
    if (results.length > 0) {
      req.session.usuario = datos.usuario;
     res.status(200).send('Inicio de sesion correcto')
    }else { 
      res.status(400).send('Datos incorrectos')
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
})
app.get('/validar', (req, res) => {
  if(req.session.usuario){
    res.status(200).send('sesion validada')
  } else {
    res.status(401).send('No autorizado')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
