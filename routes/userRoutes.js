const express = require('express');
const userController = require('../controllers/userController');
const authController = require ('./../controllers/authController');
const router = express.Router();

//bringin the authController to use the signup method that we make on the controller into the route
//sometimes we can create routes that don't follow the REST philosophy  like the signup route, an example of the REST philosophy  is the router from below this
//for signup we only need the post :)
router.post('/signup', authController.signup);
router.post('/login', authController.login);


router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
