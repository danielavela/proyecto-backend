require('dotenv').config({ path: '../.env'});
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');

const Child = db.Child;

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(4000, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Child.sync().then(() => {
    const children = [
      { name: 'Jack Smith', legalSituation: 'Situacion de riesgo', 
      education: 'Primaria', typeIncome: 'caso 1'},
      { name: 'Adam Obrien', legalSituation: 'Situacion de riesgo', 
      education: 'Primaria', typeIncome: 'caso 2'},
      { name: 'Dana Paola', legalSituation: 'Situacion de riesgo', 
      education: 'Primaria', typeIncome: 'caso 3'},
    ]
    
    for(let i=0; i<children.length; i++){
      Child.create(children[i]);
    }
  })
});