const express = require('express');
const auth_controller = require('../controllers/auth_controller');
const validation_rules = require('../middlewares/validation/validation_rules');
const validation_middlewares = require('../middlewares/validation/validation_middlewares');
const check_auth_middlewares = require('../middlewares/authentication/check-auth/check_auth_middlewares');
const register_middlewares = require('../middlewares/authentication/register/register_middlewares');
const refresh_token_middlewares = require('../middlewares/authentication/refresh-token/refresh_token_middlewares');

const router = express.Router();

// GET /api/v1/check-auth        # Check client authenticated or not
router.get(
    '/check-auth',
    check_auth_middlewares.decode_token,
    auth_controller.check_auth,
);


// POST /api/v1/register        # Sign up
router.post(
    '/register',
    validation_rules.register,
    validation_middlewares,
    register_middlewares.check_user_exists,
    register_middlewares.create_new_user,
    register_middlewares.create_new_profile,
    register_middlewares.generate_auth_token,
    register_middlewares.update_user_status,
    auth_controller.register
);

// POST /api/v1/refresh-token
router.post(
    '/refresh-token',
    refresh_token_middlewares.decode_token,
    refresh_token_middlewares.generate_new_token,
    auth_controller.refresh_token,
);


module.exports = router;