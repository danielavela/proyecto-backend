//require('dotenv').config();
const env = {
    database: 'proyectodb',
    host: 'localhost',
    user: 'postgres',
    password:'password',
    dialect:'postgres',
    port: '5432',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
};
module.exports=env;