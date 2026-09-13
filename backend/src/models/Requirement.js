const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
            trim: true,
        },

        eventType: {
            type: String,
            required: true,
            enum: ["wedding", "corporate", "concert", "private", "other"],
        },

        startDate: {
            type: String,
            required: true,
        },

        endDate: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        venue: {
            type: String,
            trim: true,
            default: "",
        },

        category: {
            type: String,
            required: true,
            enum: ["planner", "performer", "crew"],
        },

        details: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Requirement = mongoose.model(
    "Requirement",
    requirementSchema
);

module.exports = Requirement;