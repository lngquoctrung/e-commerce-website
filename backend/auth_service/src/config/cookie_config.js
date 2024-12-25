const NODE_ENV = process.env.NODE_ENV;
const ACCESS_TOKEN_COOKIE_MAX_AGE = process.env.ACCESS_TOKEN_COOKIE_MAX_AGE;
const REFRESH_TOKEN_COOKIE_MAX_AGE = process.env.REFRESH_TOKEN_COOKIE_MAX_AGE;

// ! Missing configuration
if(!NODE_ENV || !ACCESS_TOKEN_COOKIE_MAX_AGE || !REFRESH_TOKEN_COOKIE_MAX_AGE) {
    console.error('Missing configuration for cookie');
    process.exit(1);
}

module.exports = {
    access_token: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        path: '/',
        maxAge: parseInt(ACCESS_TOKEN_COOKIE_MAX_AGE),
    },
    refresh_token: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        path: '/',
        maxAge: parseInt(REFRESH_TOKEN_COOKIE_MAX_AGE),
    }
}