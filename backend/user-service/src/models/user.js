const mongoose = require('mongoose');
const moment = require('moment-timezone');

const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    refresh_token: {
        type: String,
        default: '',
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    verification_token: {
        type: String,
        default: ''
    },
    token_expires: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, {
    toJSON: {
        transform: function(doc, ret) {
            ret.created_at = moment(ret.created_at).tz('Asia/Ho_Chi_Minh').format();
            ret.updated_at = moment(ret.updated_at).tz('Asia/Ho_Chi_Minh').format();
        }
    }
});

module.exports = mongoose.model('User', user_schema);