const LogbookEntry = require("../models/logbookEntry.model");

// POST
exports.create = (req, res) => {
    if (!req.body.pilotName) {
        res.status(400).send({
            message: "Logbook entry requires a pilot's name.",
        });
        return;
    }

    const logbookEntry = new LogbookEntry({
        pilotName: req.body.pilotName,
        depICAO: req.body.depICAO,
        arrICAO: req.body.arrICAO,
        depTimeZulu: req.body.depTimeZulu,
        arrTimeZulu: req.body.arrTimeZulu,
        flightTime: req.body.flightTime,
    });

    logbookEntry
        .save(logbookEntry)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while saving the logbook entry.",
            });
        });
};

// GET
exports.findAll = (req, res) => {
    LogbookEntry.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(`An error occured while fetching the logbook entries ${err}`);
        });
};

// PUT
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).json("Data to update the logbook entry can't be empty!");
    }

    const id = req.params.id;

    LogbookEntry.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: `Cannot update a logbook entry with id=${id}.`,
                });
            } else {
                res.json("Logbook entry has been updated.");
            }
        })
        .catch(err => {
            res.status(500).json(`Error ${err}`);
        });
};
