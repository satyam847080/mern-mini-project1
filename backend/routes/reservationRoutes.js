
const express = require("express");
const router = express.Router();

const Reservation = require("../models/Reservation");
const adminAuth = require("../middleware/adminAuth");

// GET: Fetch All Reservations (Admin Only)
router.get("/", adminAuth, async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            total: reservations.length,
            reservations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// POST: Create New Reservation (Public)
router.post("/", async (req, res) => {
    try {
        const { name, phone, email, persons, date } = req.body;

        if (!name || !phone || !email || !persons || !date) {
            return res.status(400).json({
                success: false,
                message: "Please fill all booking details"
            });
        }

        const newReservation = new Reservation({
            name,
            phone,
            email,
            persons,
            date
        });

        await newReservation.save();

        res.status(201).json({
            success: true,
            message: "Table booked successfully!",
            reservation: newReservation
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// PATCH: Confirm Attended Booking (Admin Only)
router.patch("/:id/confirm", adminAuth, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            });
        }

        reservation.status = "Confirmed";
        await reservation.save();

        res.status(200).json({
            success: true,
            message: "Booking confirmed successfully!",
            reservation
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
