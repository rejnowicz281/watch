const { Schema, models, model } = require("mongoose");

const timerSchema = new Schema(
    {
        length: {
            type: Number,
            min: [1, "Timer length must be greater than 0"],
            required: true,
        },
        name: {
            type: String,
            default: "Untitled Timer",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const Timer = models.Timer || model("Timer", timerSchema);

module.exports = Timer;
