
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const username = "admin";
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            throw new Error("ADMIN_PASSWORD missing in .env file");
        }

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.log("Admin account already exists!");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            username,
            password: hashedPassword
        });

        console.log("Admin account created successfully!");

    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
