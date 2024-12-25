const express = require('express');
const user_controller = require('../controllers/user_controller');
const auth_middlewares = require('../middlewares/auth/auth_middlewares');

const router = express.Router();

// GET /api/v1/users            # Gets all users
router.get(
    '/',
    auth_middlewares.check_authentication,
    auth_middlewares.check_authorization,
    user_controller.get_all_users,
);

// GET /api/v1/users/search     # Searches a user
router.get('/search', user_controller.search_user);

// GET /api/v1/users/:id        # Gets a user
router.get(
    '/:id',
    auth_middlewares.check_authentication,
    user_controller.get_user_by_id
);

// POST /api/v1/users           # Creates a new user
router.post('/', user_controller.create_new_user);

// PUT /api/v1/users/:id        # Updates user
router.put(
    '/:id',
    auth_middlewares.check_authentication,
    user_controller.update_user
);

// DELETE /api/v1/users/:id     # Deletes user
router.delete(
    '/:id',
    auth_middlewares.check_authentication,
    user_controller.delete_user
);

module.exports = router;