const { createUser } = require("../services/auth.service");

const authController = {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;

            console.log(`${email} ${password}`);

            const user = await createUser(email, password);

            res.send(user);
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = authController;
