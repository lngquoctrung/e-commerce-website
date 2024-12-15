const { body } = require('express-validator');

module.exports = {
    register: [
        body('first_name')
            .notEmpty()
            .withMessage('Please enter the first name'),
        body('last_name')
            .notEmpty()
            .withMessage('Please enter the last name'),
        body('email')
            .notEmpty()
            .withMessage('Please enter the email')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .notEmpty()
            .withMessage('Please enter the password')
            .isLength({ min: 8})
            .withMessage('The password must has at least 8 characters')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
            .withMessage('The password must contain both characters and numbers'),
        body('confirm_password')
            .custom((value, { req }) => {
                if(value !== req.body.password)
                    throw new Error('The password does not match')
                return true;
            }),
    ],
    login: [
        body('email')
            .notEmpty()
            .withMessage('Please enter the email')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .notEmpty()
            .withMessage('Please enter the password')
    ]
}