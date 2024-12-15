const express = require('express');
const profileController = require('../controllers/profileController');
const authentication = require('../middlewares/authentication');

const router = express.Router({ mergeParams: true });

// GET /api/v1/users/profile           # Get user's profile by user ID (authentication)
router.get('/', authentication, profileController.getProfile);
// PUT /api/v1/users/profile           # Update user's profile by user ID (authentication)
router.put('/', authentication, profileController.updateProfile);

module.exports = router;