const express = require("express");
const router = express.Router();
const logbook = require("../controllers/logbook.controller");

// /api/logbook: GET, POST
// /api/logbook/:id: PUT

// Retrieve all logs
router.get("/", logbook.findAll);

// Create a new log
router.post("/", logbook.create);

// Update log
router.put("/:id", logbook.update);

module.exports = router;
