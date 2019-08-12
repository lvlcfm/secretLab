const AuthController = require('../controllers/auth_controller');
const UsersController = require('../controllers/users_controller');
const SitesController = require('../controllers/sites_controller');

module.exports = app => {
  app.get('/api', UsersController.greeting);

  //authentication
  app.post('/api/signup', AuthController.signup);
  app.post('/api/login', AuthController.login);

  //users
  app.post('/api/users', UsersController.create);
  app.put('/api/users/:id', UsersController.edit);
  app.delete('/api/users/:id', UsersController.delete);

  //sites
  app.post('/api/sites', SitesController.create);
  app.put('/api/sites/:id', SitesController.edit);
  app.delete('/api/sites/:id', SitesController.delete);
};
