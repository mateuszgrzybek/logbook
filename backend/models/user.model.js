const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        logbookEntries: [],
        aircraftTypes: [],
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

// hash the password
userSchema.pre("save", async function(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
});

// generate authorization token for the given user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            logbookEntries: user.logbookEntries,
            aircraftTypes: user.aircraftTypes,
        },
        "secret"
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// search for an existing user with provided credentials and return if found
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error({ error: "Could not associate the email address with an existing user." });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
        throw new Error({ error: "The provided password does not match the email address." });
    }

    return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
