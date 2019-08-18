const AuthController = require('../controllers/auth_controller');
const UsersController = require('../controllers/users_controller');
const SitesController = require('../controllers/sites_controller');
const SiteTimesController = require('../controllers/siteTime_controller');
const LessonsController = require('../controllers/lessons_controller');
const RequestsController = require('../controllers/requests_controller');
const RostersController = require('../controllers/roster_controller');

module.exports = app => {
  //authentication
  app.get('/api', AuthController.greeting);
  app.post('/api/signup', AuthController.signup);
  app.post('/api/login', AuthController.login);

  //users
  app.get('/api/users/sitetimes/:id', UsersController.getUserSiteTimes);
  app.post('/api/users/:id', UsersController.getUserById);
  app.post('/api/users', UsersController.create);
  app.put('/api/users/:id', UsersController.edit);
  app.put('/api/users/sitetimes/join', UsersController.joinSiteTime);
  app.put('/api/users/sitetimes/leave', UsersController.leaveSiteTime);
  app.put('/api/users/:id', UsersController.edit);
  app.delete('/api/users/:id', UsersController.delete);

  //sites
  app.get('/api/sites', SitesController.index);
  app.get('/api/sites/:id', SitesController.get);
  app.post('/api/sites', SitesController.create);
  app.put('/api/sites/:id', SitesController.edit);
  app.delete('/api/sites/:id', SitesController.delete);

  //sitesTimesj
  app.get('/api/sitetimes/site/:id', SiteTimesController.getSiteTimes);
  app.post('/api/sitetimes', SiteTimesController.create);
  app.put('/api/sitetimes/:id', SiteTimesController.edit);
  app.delete('/api/sitetimes/:id', SiteTimesController.create);

  //lessons
  app.get('/api/lessons', LessonsController.index);
  app.get('/api/lessons/:id', LessonsController.getLessonsById);
  app.get('/api/lessons/site/:id', LessonsController.getLessonsBySite);
  app.post('/api/lessons', LessonsController.create);
  app.put('/api/lessons/:id', LessonsController.edit);
  app.delete('/api/lessons/:id', LessonsController.delete);

  //requests
  app.get('/api/requests', RequestsController.index);
  app.get('/api/requests/role/:id', RequestsController.getUserRoleRequests);
  app.get('/api/requests/site/:id', RequestsController.getUserSiteRequests);
  app.post('/api/requests', RequestsController.create);
  app.put('/api/requests/:id', RequestsController.edit);
  app.delete('/api/requests/:id', RequestsController.delete);

  //roster
  app.get('/api/rosters/site/:id', RostersController.getRosterEntriesBySite);
  app.get(
    '/api/rosters/sitetime/:id',
    RostersController.getRosterEntriesBySiteTime
  );
  app.post('/api/rosters', RostersController.create);
  app.put('/api/rosters/:id', RostersController.edit);
  app.delete('/api/rosters/:id', RostersController.delete);
};
