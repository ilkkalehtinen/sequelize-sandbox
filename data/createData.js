"use strict";

const users = require('./users.json');

module.exports = models => {
  return models.User.bulkCreate(users)
    .then(() => models.User.findAll())
      .then(users => {
        return models.Project.create({
          name: 'test project',
          userId: users[0].id
        });
      });
}