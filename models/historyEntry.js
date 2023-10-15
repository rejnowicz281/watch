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
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const HistoryEntry = models.HistoryEntry || model("HistoryEntry", historyEntrySchema);

module.exports = HistoryEntry;
