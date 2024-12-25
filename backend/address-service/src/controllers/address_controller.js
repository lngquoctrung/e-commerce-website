const address_helper = require('../helpers/address_helper');
const response_helper = require('../helpers/response_helper');

// Gets all addresses of specified profile id
const get_addresses_by_profile_id = async (req, res) => {
    const profile_id = req.query.id;
    try {
        const addresses = await address_helper.get_addresses({ profile: profile_id });
        return res.status(200).json(
            response_helper.success(
                200,
                "Get list of addresses successfully",
                addresses
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while retrieving the address list",
                error.message
            )
        );
    }
}

// Get single address
const get_address_by_id = async (req, res) => {
    const address_id = req.params.id;
    try {
        const address = await address_helper.get_address({ _id: address_id });
        if(!address)
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No address found with this id",
                )
            );
        return res.status(200).json(
            response_helper.success(
                200,
                "Get address successfully",
                address
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while retrieving the address",
                error.message
            )
        );
    }
}

// Creates new address
const create_new_address = async (req, res) => {
    const { profile_id, street, state, city, country, postal_code, is_primary } = req.body;
    try {
        const new_address = await address_helper.create_new_address({
            profile: profile_id,
            street,
            state,
            city,
            country,
            postal_code,
            is_primary
        });
        return res.status(201).json(
            response_helper.success(
                201,
                "Create new address successfully",
                new_address
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while creating new address",
                error.message
            )
        );
    }
}

// Updates specified address
const update_address = async (req, res) => {
    const address_id = req.params.id;
    const update = req.body;
    try {
        const updated_address = await address_helper.update_address(
            { _id: address_id },
            update,
        );
        if(!updated_address)
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No address found with this id"
                )
            );
        return res.status(200).json(
            response_helper.success(
                200,
                "Update address successfully",
                updated_address
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while updating address",
                error.message
            )
        );
    }
}

// Deletes specified address
const delete_address = async (req, res) => {
    const address_id = req.params.id;
    try {
        const deleted_address = await address_helper.delete_address({ _id: address_id });
        if(!deleted_address)
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No address found with this id"
                )
            );
        return res.status(200).json(
            response_helper.success(
                200,
                "Deleted new address successfully",
                deleted_address
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while deleting address",
                error.message
            )
        );
    }
}

module.exports = {
    get_addresses_by_profile_id,
    get_address_by_id,
    create_new_address,
    update_address,
    delete_address
}