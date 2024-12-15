const express = require('express');
const addressController = require('../controllers/addressController');
const authentication = require('../middlewares/authentication');

const router = express.Router();

// GET /api/v1/users/{userId}/profile/addresses                    # Get all addresses by user ID (authentication)
router.get('/', authentication, addressController.getAllAddresses);
// GET /api/v1/users/{userId}/profile/addresses/{addressId}        # Get address by address ID and user ID (authentication)
router.get('/:addressId', authentication, addressController.getAddress);
// POST /api/v1/users/{userId}/profile/addresses                   # Create new addresses by user ID (authentication)
router.post('/', authentication, addressController.createAddress);
// PUT /api/v1/users/{userId}/profile/addresses/{addressId}        # Update address by address ID and user ID (authentication)
router.put('/:addressId', authentication, addressController.updateAddress);
// DELETE /api/v1/users/{userId}/profile/addresses/{addressId}     # Delete address by address ID and user ID (authentication)
router.delete('/:addressId', authentication, addressController.deleteAddress);

module.exports = router;