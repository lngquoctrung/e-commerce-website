const mongoose = require('mongoose');
const moment = require('moment-timezone');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    email: {
        type: String,
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
    // Date of birth
    dob: {
        type: Date,
        default: new Date('01-01-1990'),
    },
    profile_image: {
        type: String,
        default: '',
    },
    phone_number: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: 'Prefer not to say',
        enum: ['Male', 'Female', 'Other', 'Prefer not to say']
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const convertTimeZone = (utcDate) => {
    return moment(utcDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
}

// Convert time to Asian timezone before query
profileSchema.post(['findOne', 'findOneAndUpdate'], function(result) {
    if(result) {
        result.createdAt = convertTimeZone(result.createdAt);
    }
});

module.exports = mongoose.model('Profile', profileSchema);