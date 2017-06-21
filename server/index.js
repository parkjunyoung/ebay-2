import express from 'express';
 
const app = express();
 
let port = 3000;

import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG

import Sequelize from 'sequelize';
const sequelize = new Sequelize( process.env.DATABASE , process.env.DB_USER , process.env.DB_PASSWORD , {
  host:  process.env.DB_HOST ,
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
 
app.get('/', (req, res) => {
    res.send('Es6 export Import');
});
 
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
})