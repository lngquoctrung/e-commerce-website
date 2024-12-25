const mongoose = require('mongoose');
const moment = require('moment-timezone');

const address_schema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    state: {                // Or district
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postal_code: {
        type: String,
        default: ''
    },
    is_primary: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform: function(doc, ret) {
            ret.created_at = moment(ret.created_at).tz('Asia/Ho_Chi_Minh').format();
            ret.updated_at = moment(ret.updated_at).tz('Asia/Ho_Chi_Minh').format();
        }
    }
});

module.exports = mongoose.model('Address', address_schema);