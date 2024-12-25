const express = require('express');
const address_controller = require('../controllers/address_controller');

const router = express.Router();

// GET /api/v1/addresses/            # Gets the list of addresses by profile id
router.get('/', address_controller.get_addresses_by_profile_id);

// GET /api/v1/addresses/:id         # Gets the single address by id
router.get('/:id', address_controller.get_address_by_id);

// POST /api/v1/addresses/           # Create new address
router.post('/', address_controller.create_new_address);

// PUT /api/v1/addresses/:id         # Updates the specified address by id
router.put('/:id', address_controller.update_address);

// DELETE /api/v1/addresses/:id      # Deletes specified address by id
router.delete('/:id', address_controller.delete_address);

module.exports = router;