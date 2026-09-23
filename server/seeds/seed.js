import mongoose from "mongoose";
import dotenv from "dotenv";

import Event from "../models/event.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

import {
    generateEvent,
    generateMessage,
    generateUsers
} from "./data.js";

dotenv.config({ path : "./.env.test"});

async function seed() {

    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // -------------------------
        // USERS
        // -------------------------

        const userData = generateUsers(10);

        const users = [];

        for (const data of userData) {

            const user = new User(data);

            await user.save();

            users.push(user);
        }

        console.log(`${users.length} users created`);


        // -------------------------
        // EVENTS
        // -------------------------

        const eventData = Array.from(
            { length: 10 },
            (_, i) => generateEvent(i + 1)
        );

        const events = await Event.insertMany(eventData);

        console.log(`${events.length} events created`);


        // -------------------------
        // MESSAGES
        // -------------------------

        const eventIds = events.map(event => event._id);

        const messageData = Array.from(
            { length: 10 },
            (_, i) => generateMessage(i + 1, eventIds)
        );

        const messages = await Message.insertMany(messageData);

        console.log(`${messages.length} messages created`);

        console.log("Database seeded successfully");

    } catch (error) {

        console.error("Seeding failed:", error);

    } finally {

        await mongoose.disconnect();

        console.log("MongoDB disconnected");
    }
}

seed();