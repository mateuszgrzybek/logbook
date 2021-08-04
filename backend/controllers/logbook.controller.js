const models = require("../models");
const LogbookEntry = models.logbookEntry;

// POST
exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const parsedDepTimeZulu = Date.parse(req.body.depTimeZulu);
    const parsedArrTimeZulu = Date.parse(req.body.arrTimeZulu);
    const flightTimeHours =
        (parsedArrTimeZulu.getTime() - parsedDepTimeZulu.getTime()) / 3600000;

    const logbookEntry = new LogbookEntry({
        pilotName: req.body.pilotName,
        depICAO: req.body.depICAO,
        arrICAO: req.body.arrICAO,
        depTimeZulu: parsedDepTimeZulu,
        arrTimeZulu: parsedArrTimeZulu,
        flightTime: flightTimeHours,
    });

    logbookEntry
        .save(logbookEntry)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occured while saving the logbook entry.",
            });
        });
};
