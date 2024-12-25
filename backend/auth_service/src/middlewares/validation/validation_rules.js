const { body } = require('express-validator');

module.exports = {
    register: [
        body('first_name')
            .trim()
            .notEmpty()
            .withMessage('Please enter your first name')
            .isLength({ min: 1 })
            .withMessage('The first name must have at least a character'),
        body('last_name')
            .trim()
            .notEmpty()
            .withMessage('Please enter your last name')
            .isLength({ min: 1 })
            .withMessage('The last name must have at least a character'),
        body('date_of_birth')
            .notEmpty()
            .withMessage('Please enter your birth day')
            .isISO8601()
            .withMessage('Your birth day is invalid')
            .custom((value) => {
                    const birthDate = new Date(value);
                    const today = new Date();
                    // Check minimum age (eg: 13 years old)
                    const minAge = 13;
                    const minDate = new Date();
                    minDate.setFullYear(today.getFullYear() - minAge);

                    // Check maximum age (eg: 120 years old)
                    const maxAge = 120;
                    const maxDate = new Date();
                    maxDate.setFullYear(today.getFullYear() - maxAge);

                    if (birthDate > today) {
                        throw new Error('Birthdate cannot be in the future');
                    }

                    if (birthDate > minDate) {
                        throw new Error(`You must be ${minAge} old to register`);
                    }

                    if (birthDate < maxDate) {
                        throw new Error('Invalid birthdate');
                    }

                    return true;
                }),
        body('email')
            .notEmpty()
            .withMessage('Please enter your email')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .notEmpty()
            .withMessage('Please enter your password')
            .isLength({ min: 5 })
            .withMessage('Minimum password length is 5 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d).*$/)
            .withMessage('Password must include characters and numbers'),
        body('confirm_password')
            .custom((v, { req }) => {
                if(v !== req.body.password) {
                    throw new Error('Password does not match');
                }
                return true;
            }),
    ],
    login: [

    ],
}