const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logbookEntrySchema = new Schema(
    {
        pilotName: String,
        depICAO: String,
        arrICAO: String,
        depTimeZulu: Date,
        arrTimeZulu: Date,
        flightTime: Number,
        aircraftICAO: String,
        aircraftRegistration: String,
    },
    { timestamps: true }
);

const LogbookEntry = mongoose.model("LogbookEntry", logbookEntrySchema);

module.exports = LogbookEntry;
