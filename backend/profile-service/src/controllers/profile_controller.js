const profile_helper = require('../helpers/profile_helper');
const response_helper = require('../helpers/response_helper');

// Gets the list of profiles
const get_all_profiles = async (req, res) => {
    try {
        const profiles = await profile_helper.get_all_profiles();
        return res.status(200).json(
            response_helper.success(
                200,
                "Get list of profiles successfully",
                profiles,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while retrieving the profiles list",
                error.message,
            )
        );
    }
}

// Gets profile of a user by id
const get_profile_by_id = async (req, res) => {
    const profile_id = req.params.id;
    try {
        const profile = await profile_helper.get_profile_by_id({
            _id: profile_id
        });
        if(!profile) {
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No profile found with this id"
                )
            );
        }
        return res.status(200).json(
            response_helper.success(
                200,
                "Get profile of user successfully",
                profile,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while getting for the profile",
                error.message,
            )
        );
    }
}

const create_new_profile = async (req, res) => {
    const { user_id, first_name, last_name, email, date_of_birth } = req.body;
    try {
        const new_profile = await profile_helper.create_new_profile({
            user: user_id,
            first_name,
            last_name,
            email,
            date_of_birth,
        });
        return res.status(201).json(
            response_helper.success(
                201,
                "Profile created successfully",
                new_profile,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while creating the profile for user",
                error.message,
            )
        );
    }
}

const update_profile = async (req, res) => {
    try {

    } catch(error) {

    }
}

const delete_profile = async (req, res) => {
    try {

    } catch(error) {

    }
}

module.exports = {
    get_all_profiles,
    get_profile_by_id,
    create_new_profile,
    update_profile,
    delete_profile,
}