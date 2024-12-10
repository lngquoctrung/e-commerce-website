const mongoose = require('mongoose');
const moment = require('moment-timezone');

const profileSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        default: '',
    },
    dob: {
        type: String,
        default: () => {
            return moment(new Date('1990-01-01')).format('DD/MM/YYYY')
        },
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', "Unknown"],
        default: 'Unknown',
    },
    profile_picture: {
        type: String,
        default: `${process.env.MEDIA_SERVICE_API}/public/users/default_avatar.jpg`,
    },
    signup_date: {
        type: String,
        default: () => {
            return getCurrentVietnamTime();
        },
    },
    last_login: {
        type: String,
        default: () => {
            return getCurrentVietnamTime();
        },
    },
});

const getCurrentVietnamTime = () => {
    return moment.tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
}

profileSchema.pre('findOneAndUpdate', async function(next) {
    this.last_login = getCurrentVietnamTime();
    if('dob' in this.getUpdate())
        this.dob = moment(this['dob']).format('DD/MM/YYYY');
    next();
});

module.exports = mongoose.model("Profile", profileSchema);