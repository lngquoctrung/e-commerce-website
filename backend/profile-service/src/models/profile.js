const mongoose = require('mongoose');
const moment = require('moment-timezone');

const profile_schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        default: 'Prefer not to say',
    },
    profile_image: {
        type: String,
        default: ''
    },
    phone_number: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform: function(doc, ret) {
            ret.date_of_birth = moment(ret.date_of_birth).tz('Asia/Ho_Chi_Minh').format();
            ret.created_at = moment(ret.created_at).tz('Asia/Ho_Chi_Minh').format();
            ret.updated_at = moment(ret.updated_at).tz('Asia/Ho_Chi_Minh').format();
            return ret;
        }
    }
});

module.exports = mongoose.model('Profile', profile_schema);