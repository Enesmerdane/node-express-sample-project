// Models
const { User } = require("../models/user");

const createUser = async (email, password) => {
    try {
        const user = new User({
            email,
            password,
        });

        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser };
