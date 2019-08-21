"use strict";

const Sequelize = require('sequelize');

const db = require('./db');;

class Models {
  constructor() {
    this.sequelize = db();

    this.User = this.defineUser();
    this.Project = this.defineProject();

    this.User.hasOne(this.Project);
  }

  defineUser() {
    return this.sequelize.define('user', {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
      }
    }, {});
  }

  defineProject() {
    return this.sequelize.define('project', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {});
  }

  sync() {
    return this.sequelize.sync({ force: true });
  }
}

module.exports = Models;
