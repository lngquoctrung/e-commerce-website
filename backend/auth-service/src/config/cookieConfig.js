module.exports = {
    accessToken: {
        httpOnly: false,                                     // Cookies can not access by javascript of browser
        secure: process.env.NODE_ENV === 'production',      // Cookies only send by HTTPS in production environment
        maxAge: process.env.COOKIE_ACCESS_TOKEN_MAX_AGE     // 1h
    },
    refreshToken: {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: process.env.COOKIE_REFRESH_TOKEN_MAX_AGE    // 3d
    }
}