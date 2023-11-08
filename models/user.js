const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            // TODO: Check if it is really an email or not
            // then throw error accordingly
            // otherwise do nothing
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    firstname: {
        type: String,
        maxLength: 20,
        trim: true,
    },
    lastname: {
        type: String,
        maxLenght: 20,
        trim: true,
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Age cannot be less then 0");
            }

            if (value < 18) {
                throw new Error(
                    "The user must be at least 18 to register to the website"
                );
            }
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
