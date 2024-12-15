const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
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
        default: 'user'
    },
    refreshToken: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    passwordResetToken: {
        type: String,
        default: ''
    },
    passwordResetExpires: {
        type: Date,
        default: Date.now,
    },
});

const convertTimeZone = (utcDate) => {
    return moment(utcDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
}

// Convert time to Asian timezone before query
userSchema.post(['find', 'findOne', 'findOneAndUpdate', 'findOneAndDelete'], function(result) {
    if(Array.isArray(result)){
        result.forEach(user => {
            user.createdAt = convertTimeZone(user.createdAt);
        });
    } else if (result) {
        result.createdAt = convertTimeZone(result.createdAt);
    }
});

module.exports = mongoose.model('User', userSchema);