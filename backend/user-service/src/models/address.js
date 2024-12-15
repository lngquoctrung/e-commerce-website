const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // The name of street
    street: {
        type: String,
        required: true,
    },
    // District or state
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Address', addressSchema);