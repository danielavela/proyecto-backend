require('dotenv').config();
const env = require('./env.js');
const Sequelize = require('sequelize');
const sequelize= new Sequelize(env.database, env.user, env.password,{
    host: env.host,
    dialect: env.dialect,
    //operatorsAliases: false,

    pool:{
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle

    }

});
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.Child= require('../models/children.model.js')(sequelize,Sequelize);

module.exports= db;