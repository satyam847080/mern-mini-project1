
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Routes
const reservationRoutes = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Feane Restaurant Backend is Running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });
