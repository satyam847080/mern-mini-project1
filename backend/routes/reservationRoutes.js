const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("Reservation API is Working!");
});

module.exports = router;