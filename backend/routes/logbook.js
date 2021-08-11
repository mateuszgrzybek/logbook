const express = require("express");
const router = express.Router();
const logbookController = require("../controllers/logbook.controller");

// /api/logbook: GET, POST
// /api/logbook/:id: PUT

// Retrieve all logs
router.get("/", logbookController.findAll);

// Create a new log
router.post("/", logbookController.create);

// Update log
router.put("/:id", logbookController.update);

// Delete log
router.delete("/:id", logbookController.delete);

module.exports = router;
