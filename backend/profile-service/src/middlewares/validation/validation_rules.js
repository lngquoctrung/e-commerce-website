const { body } = require('express-validator');
const mongoose = require('mongoose');

module.exports = {
    create_profile: [
        body('user_id')
            .notEmpty()
            .withMessage('User ID is not empty')
            .custom((v) => {
                if(!mongoose.Types.ObjectId.isValid(v)) {
                    throw new Error('ID is invalid');
                }
                return true;
            }),
        body('first_name')
            .notEmpty()
            .withMessage('The first name of user is not empty'),
        body('last_name')
            .notEmpty()
            .withMessage('The last name of user is not empty'),
        body('email')
            .notEmpty()
            .withMessage('User email is not empty')
            .isEmail()
            .withMessage('User email is invalid'),
        body('date_of_birth')
            .notEmpty()
            .withMessage('The date of birth is not empty')
    ],
    update_profile: [
        // TODO
    ]
}