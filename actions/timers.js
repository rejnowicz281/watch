import HistoryEntry from "@models/historyEntry";
import Timer from "@models/timer";
import { connectToDB } from "@utils/database";
import { revalidatePath } from "next/cache";

export async function getTimers() {
    await connectToDB();

    const timers = await Timer.find();

    return timers;
}

export async function getTimer(id) {
    await connectToDB();

    const timer = await Timer.findById(id);

    return timer;
}

export async function saveHistoryEntry(timerId, note, seconds_passed) {
    "use server";

    await connectToDB();

    const entry = new HistoryEntry({
        note,
        seconds_passed,
    });

    try {
        await entry.validate();

        await Timer.findByIdAndUpdate(
            timerId,
            {
                $push: { history: entry },
            },
            { new: true }
        );

        revalidatePath(`/timers/${timerId}`);

        const data = {
            action: "saveHistoryEntry",
            success: true,
        };
        console.log(data);
        return data;
    } catch (err) {
        const data = {
            action: "saveHistoryEntry",
            success: false,
        };
        console.log(data);
        return data;
    }
}
