const AuthController = require('../controllers/auth_controller');
const UsersController = require('../controllers/users_controller');
const SitesController = require('../controllers/sites_controller');
const LessonsController = require('../controllers/lessons_controller');
const RequestsController = require('../controllers/requests_controller');

module.exports = app => {
  //authentication
  app.get('/api', AuthController.greeting);
  app.post('/api/signup', AuthController.signup);
  app.post('/api/login', AuthController.login);

  //users
  app.post('/api/users/:id', UsersController.getUserById);
  app.post('/api/users', UsersController.create);
  app.put('/api/users/:id', UsersController.edit);
  app.delete('/api/users/:id', UsersController.delete);

  //sites
  app.get('/api/sites', SitesController.index);
  app.get('/api/sites/:id', SitesController.get);
  app.post('/api/sites', SitesController.create);
  app.put('/api/sites/:id', SitesController.edit);
  app.delete('/api/sites/:id', SitesController.delete);

  //lessons
  app.get('/api/lessons', LessonsController.index);
  app.post('/api/lessons', LessonsController.create);
  app.put('/api/lessons/:id', LessonsController.edit);
  app.delete('/api/lessons/:id', LessonsController.delete);

  //requests
  app.get('/api/requests', RequestsController.index);
  app.post('/api/requests', RequestsController.create);
  app.put('/api/requests/:id', RequestsController.edit);
  app.delete('/api/requests/:id', RequestsController.delete);
};
