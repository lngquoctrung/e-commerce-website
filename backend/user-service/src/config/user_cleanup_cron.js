const cron = require('node-cron');
const User = require('../models/user');

// Create a schedule to remove unverified users after n days
const start_user_cleanup_cron = () => {
    // Schedule and task
    // * * * * *
    // │ │ │ │ │
    // │ │ │ │ └── Day of the week (0-6) (Sunday = 0)
    // │ │ │ └──── Month (1-12)
    // │ │ └────── Day of the month (1-31)
    // │ └──────── Hours (0-23)
    // └────────── Minutes (0-59)
    // Example: 0 0 * * * => Task is performed at 00:00 every day
    // '*' : any value, : list of values (eg: 1,3,5)
    // '-' : range of values (eg: 1-5)
    // '/' : step (eg: */2 means every 2 units)
    // Example:
    // Run every 30 minutes
    // cron.schedule('*/30 * * * *', () => {});
    cron.schedule('*/2 * * * *', async () => {
        try {
            const five_minutes_ago = new Date(Date.now() - 1000 * 60 * 5);
            const deleted_users = await User.deleteMany({
                is_verified: false,
                created_at: { $lt: five_minutes_ago },
            });
            console.log(`Removed ${deleted_users.deletedCount} users`);
        } catch(error) {
            console.error(`Error removing users => ${error.message}`);
        }
    });
}

module.exports = start_user_cleanup_cron;