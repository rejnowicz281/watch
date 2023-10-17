import HistoryEntry from "@models/historyEntry";
import Timer from "@models/timer";
import { connectToDB } from "@utils/database";
import formatValidationError from "@utils/formatValidationError";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createTimer(formData) {
    "use server";

    await connectToDB();

    const name = formData.get("name");
    const length = formData.get("length");

    const timer = new Timer({
        name: name || undefined,
        length,
    });

    try {
        await timer.save();

        revalidatePath("/");

        const data = {
            action: "createTimer",
            success: true,
        };
        console.log(data);
        return data;
    } catch (err) {
        const validationError = formatValidationError(err);
        const data = {
            action: "createTimer",
            success: false,
            errors: validationError,
        };
        console.error(data);
        return data;
    }
}

export async function updateTimerName(formData, id) {
    "use server";

    await connectToDB();

    const name = formData.get("name");

    try {
        console.log(name);
        const newTimer = await Timer.findByIdAndUpdate(
            id,
            { name: name || undefined },
            { new: true, runValidators: true }
        );

        revalidatePath(`/timers/${id}`);

        const data = {
            action: "updateTimerName",
            success: true,
            newTimer: JSON.stringify(newTimer),
        };
        console.log(data);
        return data;
    } catch (err) {
        const validationError = formatValidationError(err);
        const data = {
            action: "updateTimerName",
            success: false,
            errors: validationError,
        };
        console.error(data);
        return data;
    }
}

export async function updateTimerLength(id, new_length) {
    "use server";

    await connectToDB();

    try {
        const newTimer = await Timer.findByIdAndUpdate(id, { length: new_length }, { new: true, runValidators: true });

        const data = {
            action: "updateTimerLength",
            success: true,
            newTimer: JSON.stringify(newTimer),
        };
        console.log(data);
        return data;
    } catch (err) {
        const validationError = formatValidationError(err);
        const data = {
            action: "updateTimerLength",
            success: false,
            errors: validationError,
        };
        console.error(data);
        return data;
    }
}

export async function deleteTimer(timerId) {
    "use server";

    await connectToDB();

    await Timer.findByIdAndDelete(timerId);

    const data = {
        action: "deleteTimer",
        success: true,
    };
    console.log(data);

    redirect("/");
}

export async function saveHistoryEntry(formData, timerId, timer_length, seconds_passed) {
    "use server";

    await connectToDB();

    const note = formData.get("note");

    const entry = new HistoryEntry({
        note: note || undefined,
        seconds_passed,
        timer_length,
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
        console.log(err);
        const validationError = formatValidationError(err);
        const data = {
            action: "saveHistoryEntry",
            success: false,
            errors: validationError,
        };
        console.error(data);
        return data;
    }
}

export async function deleteHistoryEntry(timerId, entryId) {
    "use server";

    await connectToDB();

    await Timer.findByIdAndUpdate(
        timerId,
        {
            $pull: { history: { _id: entryId } },
        },
        { new: true }
    );

    revalidatePath(`/timers/${timerId}`);

    const data = {
        action: "deleteHistoryEntry",
        success: true,
    };
    console.log(data);
    return data;
}
