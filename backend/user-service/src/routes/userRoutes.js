const express = require('express');
const authentication = require('../middlewares/authentication');
const adminAuthorization = require('../middlewares/adminAuthorization');
const handleAvatarFile = require('../middlewares/handleAvatarFile');
const controller = require('../controllers/userController');

// Set routes
const router = express.Router();

// Get all users by admin
router.get('/', authentication, adminAuthorization, controller.getAllUser);
// Search user by filter
router.get('/search', controller.search);
// Get profile of user
router.get('/profile', authentication, controller.getProfileUser);
// Get all data of user
router.get('/:id', authentication, controller.getUser);
// Create a new user
router.post('/', controller.createUser);
// Update profile of user
router.put('/profile', authentication, handleAvatarFile, controller.updateProfileUser);
// Update user
router.put('/:id', authentication, controller.updateUser);
// Delete user
router.delete('/:id', authentication, controller.deleteUser);

module.exports = router;