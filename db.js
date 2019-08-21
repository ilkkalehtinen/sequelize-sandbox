"use strict";

const Sequelize = require('sequelize');

module.exports = () => {
  const Sequelize = require('sequelize');

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './test.db',
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

    return sequelize;
}
