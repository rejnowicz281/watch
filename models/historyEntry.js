const { Schema, models, model } = require("mongoose");

const historyEntrySchema = new Schema(
    {
        note: {
            type: String,
        },
        seconds_passed: {
            type: Number,
            min: [0, "Seconds passed must be greater than or equal to 0"],
        },
        timer_length: {
            type: Number,
            min: [1, "Timer length must be greater than 0"],
            required: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const HistoryEntry = models.HistoryEntry || model("HistoryEntry", historyEntrySchema);

module.exports = HistoryEntry;
