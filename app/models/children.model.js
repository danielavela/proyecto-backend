const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize,Sequelize) => {
    const Child = sequelize.define('child',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING
        },
        legalSituation :{
            type: Sequelize.STRING
        },
        education:{
            type: Sequelize.STRING
        },
        typeIncome:{
            type: Sequelize.STRING
        }

    });
    return Child;
}