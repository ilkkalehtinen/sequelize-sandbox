"use strict";

const http = require('http');
const Express = require('express');
const epilogue = require('epilogue');

const Models = require('./models');
const createData = require('./data/createData');

const app = new Express();
const server = new http.Server(app);
const models = new Models();

epilogue.initialize({
  app: app,
  sequelize: models.sequelize,
  base: '/api'
});

const userResource = epilogue.resource({
  model: models.User,
    endpoints: [
      '/users',
    ],
    actions: ['list']
});

app.use((req, res, next) => {
  console.log(
    `Received request: ${req.method} ${req.url} from ${req.headers['user-agent']}`
  );
  next();
});

app.get('/users', (req, res, next) => {
  models.User.findAll({
    include: [{
        model: models.Project
    }],
    where: {
      '$project.id$': {
        $ne: null
      }
    }
  }).then(users => {
    res.json(users);
  });
});

if (process.env.NODE_ENV !== 'test') {
  models.sync()
    .then(() => createData(models)
      .then(() => {
        server.listen(3001, (err) => {
          if (err) {
            return console.error(err);
          }
          console.info('API Server running on http://localhost:3001');
        });
      })
    );
}

module.exports = app;
