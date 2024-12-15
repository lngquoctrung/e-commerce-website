const express = require('express');
const authController = require('../controllers/authController');
const validationRules = require('../middlewares/validation/validationRules');
const validationMiddleware = require('../middlewares/validation/validationMiddleware');
const registerMiddleware = require('../middlewares/auth/register');
const loginMiddleware = require('../middlewares/auth/login');
const credentialValidation = require('../middlewares/auth/checkAuth/credentialValidation');

const router = express.Router();

// GET /api/v1/auth/check_auth      # Check credentials
router.get('/check_auth', credentialValidation, authController.checkAuth);
// POST /api/v1/auth/register       # Sign up account
router.post(
    '/register',
    validationRules.register,
    validationMiddleware,
    registerMiddleware.checkExistingUser,
    registerMiddleware.createUser,
    registerMiddleware.generateTokens,
    registerMiddleware.updateUserTokens,
    authController.register
);
//
router.post('/login',
    validationRules.login,
    validationMiddleware,
    loginMiddleware.checkExistingUser,
    loginMiddleware.passwordAuthentication,
    loginMiddleware.generateTokens,
    loginMiddleware.updateUserTokens,
    authController.login,
);

module.exports = router;