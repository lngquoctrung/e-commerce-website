const express = require('express');
const profile_controller = require('../controllers/profile_controller');
const authentication_middlewares = require('../middlewares/auth/auth_middlewares');
const validation_rules = require('../middlewares/validation/validation_rules');
const validation_middlewares = require('../middlewares/validation/validation_middlewares');

const router = express.Router();

// GET      /api/v1/profiles/           # Gets the list of profiles
router.get(
    '/',
    authentication_middlewares.check_authentication,
    authentication_middlewares.check_authorization,
    profile_controller.get_all_profiles,
);

// GET      /api/v1/profile/:id         # Gets specified profile by id
router.get('/:id',
    authentication_middlewares.check_authentication,
    profile_controller.get_profile_by_id,
);

// POST     /api/v1/profiles/           # Creates a new profile
router.post(
    '/',
    validation_rules.create_profile,
    validation_middlewares,
    profile_controller.create_new_profile,
);

// PUT      /api/v1/profile/:id         # Updates specified profile by id
router.put(
    '/:id',
    authentication_middlewares.check_authentication,
    profile_controller.update_profile,
);

// DELETE   /api/v1/profile/:id         # Deletes specified profile by id
router.delete(
    '/:id',
    authentication_middlewares.check_authentication,
    profile_controller.delete_profile,
);

module.exports = router;