const express = require("express");
const router = express.Router();
const logbook = require("../controllers/logbook.controller");

// /api/logbook: GET, POST
// /api/logbook/:id: PUT

// Retrieve all blog
router.get("/", logbook.findAll);

// Create a new blog
router.post("/", logbook.create);

// Update a Tutorial with id
router.put("/:id", logbook.update);

module.exports = router;
