"use server";

import HistoryEntry from "@/models/historyEntry";
import Timer from "@/models/timer";
import authOptions from "@/utils/authOptions";
import { connectToDB } from "@/utils/database";
import formatValidationError from "@/utils/formatValidationError";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTimers() {
    await connectToDB();

    const session = await getServerSession(authOptions);

    const timers = await Timer.find({ user: session?.user?._id });

    return timers;
}

export async function getTimer(id) {
    await connectToDB();

    const session = await getServerSession(authOptions);

    const timer = await Timer.findOne({ _id: id, user: session?.user?._id });

    return timer;
}

export async function createTimer(formData) {
    await connectToDB();

    const name = formData.get("name");
    const length = formData.get("length");

    const session = await getServerSession(authOptions);

    const timer = new Timer({
        name: name || undefined,
        length,
        user: session?.user?._id,
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

export async function updateTimerName(newName, id) {
    await connectToDB();

    const session = await getServerSession(authOptions);

    try {
        const newTimer = await Timer.findOneAndUpdate(
            { _id: id, user: session?.user?._id },
            { name: newName || undefined },
            { new: true, runValidators: true }
        );

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
    await connectToDB();

    const session = await getServerSession(authOptions);

    try {
        const newTimer = await Timer.findOneAndUpdate(
            { _id: id, user: session?.user?._id },
            { length: new_length },
            { new: true, runValidators: true }
        );

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
    await connectToDB();

    const session = await getServerSession(authOptions);

    await Timer.deleteOne({ _id: timerId, user: session?.user?._id });

    const data = {
        action: "deleteTimer",
        success: true,
    };
    console.log(data);

    redirect("/");
}

export async function saveHistoryEntry(formData, timerId, timer_length, seconds_passed) {
    await connectToDB();

    const note = formData.get("note");

    const entry = new HistoryEntry({
        note: note || undefined,
        seconds_passed,
        timer_length,
    });

    const session = await getServerSession(authOptions);

    try {
        await entry.validate();

        await Timer.findOneAndUpdate(
            { _id: timerId, user: session?.user?._id },
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
    await connectToDB();

    const session = await getServerSession(authOptions);

    await Timer.findOneAndUpdate(
        { _id: timerId, user: session?.user?._id },
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
