const User = require("../models/user.model");

exports.registerNewUser = async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            logbookEntries: req.body.logbookEntries,
        });
        let data = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({ data, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({ error: "Login failed. Please check your credentials." });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.addUserEntry = async (req, res) => {
    const userId = req.body.userId;
    const entryId = req.body.entryId;
    User.findByIdAndUpdate(userId, { $addToSet: { logbookEntries: entryId } }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: `Cannot update a user with id=${userId}.`,
                });
            } else {
                res.json("User entries have been updated.");
            }
        })
        .catch(err => {
            res.status(500).json(`Error ${err}`);
        });
};

exports.deleteUserEntry = async (req, res) => {
    const userId = req.body.userId;
    const entryId = req.body.entryId;
    User.findByIdAndUpdate(userId, { $pull: { logbookEntries: entryId } }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: `Cannot update a user with id=${userId}.`,
                });
            } else {
                res.json("User entries have been updated.");
            }
        })
        .catch(err => {
            res.status(500).json(`Error ${err}`);
        });
};

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};
