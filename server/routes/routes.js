const AuthController = require('../controllers/auth_controller');
const UsersController = require('../controllers/users_controller');
const SitesController = require('../controllers/sites_controller');
const LessonsController = require('../controllers/lessons_controller');

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
  app.get('/api/sites', SitesController.index);
  app.get('/api/sites/:id', SitesController.get);
  app.post('/api/sites', SitesController.create);
  app.put('/api/sites/:id', SitesController.edit);
  app.delete('/api/sites/:id', SitesController.delete);

  //Lesson
  app.get('/api/lessons', LessonsController.index);
  app.post('/api/lessons', LessonsController.create);
  app.put('/api/lessons/:id', LessonsController.edit);
  app.delete('/api/lessons/:id', LessonsController.delete);
};
