const UserController = require('./controllers/UserController');
const userController = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: userController.listUsers,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUserById,
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: UserController.createUser,
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: UserController.updateUser,
  },

  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: UserController.deleteUser,
  },
]
