const mongoose = require('mongoose');
const Profile = require('./profile');

const userSchema = new mongoose.Schema({
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
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    refreshToken: {
        type: String,
        default: ''
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: Date,
        default: null,
    }
});

userSchema.pre('save', async function(next) {
    try {
        const profile = new Profile({
            first_name: this['first_name'],
            last_name: this['last_name']
        });
        await profile.save();
        this.profile = profile._id;
        next();
    } catch(error) {
        throw new Error(`Error initializing profile user => ${error.message}`);
    }
});

module.exports = mongoose.model('User', userSchema);