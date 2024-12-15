const express = require('express');
const authentication = require('../middlewares/authentication');
const userController = require('../controllers/userController');

const router = express.Router();

// GET /api/v1/users              # Get the list of user (admin)
router.get('/', authentication, userController.getAllUsers);

// GET /api/v1/users/search       # Search a user
router.get('/search', userController.searchUser);

// POST api/v1/users              # Create a new user
router.post('/', userController.createNewUser);

// GET /api/v1/users/{userId}     # Get user by user ID (authentication)
router.get('/:id', authentication, userController.getUser);

// PUT /api/v1/users/{userId}     # Update user by user ID (authentication)
router.put('/:id', authentication, userController.updateUser);

// DELETE /api/v1/users/{userId}  # Delete user by user ID (authentication)
router.delete('/:id', authentication, userController.deleteUser);


module.exports = router;