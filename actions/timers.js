"use server";

import HistoryEntry from "@/models/historyEntry";
import Timer from "@/models/timer";
import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import formatValidationError from "@/utils/actions/formatValidationError";
import authOptions from "@/utils/general/authOptions";
import { connectToDB } from "@/utils/general/database";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getTimers() {
    await connectToDB();

    const session = await getServerSession(authOptions);

    const timers = await Timer.find({ user: session?.user?._id }).sort({
        createdAt: -1,
    });

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

    const actionName = "createTimer";

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

        return actionSuccess(actionName);
    } catch (err) {
        return actionError(actionName, { errors: formatValidationError(err) });
    }
}

export async function updateTimerName(formData) {
    await connectToDB();

    const actionName = "updateTimerName";

    const session = await getServerSession(authOptions);

    try {
        const name = formData.get("name");
        const id = formData.get("id");

        const newTimer = await Timer.findOneAndUpdate(
            { _id: id, user: session?.user?._id },
            { name: name || undefined },
            { new: true, runValidators: true }
        );

        revalidatePath(`/timers/${id}`);

        return actionSuccess(actionName, { newTimer: JSON.stringify(newTimer) });
    } catch (err) {
        return actionError(actionName, { errors: formatValidationError(err) });
    }
}

export async function updateTimerLength(formData) {
    await connectToDB();

    const actionName = "updateTimerLength";

    const session = await getServerSession(authOptions);

    try {
        const length = formData.get("length");
        const id = formData.get("id");

        const newTimer = await Timer.findOneAndUpdate(
            { _id: id, user: session?.user?._id },
            { length },
            { new: true, runValidators: true }
        );

        revalidatePath(`/timers/${id}`);

        return actionSuccess(actionName, { newTimer: JSON.stringify(newTimer) });
    } catch (err) {
        return actionError(actionName, { errors: formatValidationError(err) });
    }
}

export async function deleteTimer(formData) {
    await connectToDB();

    const actionName = "deleteTimer";

    const session = await getServerSession(authOptions);

    const id = formData.get("id");

    await Timer.deleteOne({ _id: id, user: session?.user?._id });

    return actionSuccess(actionName, {}, "/");
}

export async function getTimerHistory(id) {
    await connectToDB();

    const session = await getServerSession(authOptions);

    const history = await HistoryEntry.find({ timer: id, user: session?.user?._id }).sort({
        createdAt: -1,
    });

    return history;
}

export async function saveHistoryEntry(formData, timer_length, seconds_passed) {
    await connectToDB();

    const actionName = "saveHistoryEntry";

    const session = await getServerSession(authOptions);

    const note = formData.get("note");
    const timer = formData.get("timer");

    const entry = new HistoryEntry({
        note: note || undefined,
        seconds_passed,
        timer_length,
        timer,
        user: session?.user?._id,
    });

    try {
        await entry.save();

        revalidatePath(`/timers/${timer}/history`);

        return actionSuccess(actionName);
    } catch (err) {
        return actionError(actionName, { errors: formatValidationError(err) });
    }
}

export async function deleteHistoryEntry(formData) {
    await connectToDB();

    const actionName = "deleteHistoryEntry";

    const session = await getServerSession(authOptions);

    const entryId = formData.get("entryId");
    const timerId = formData.get("timerId");

    await HistoryEntry.deleteOne({ _id: entryId, user: session?.user?._id, timer: timerId });

    revalidatePath(`/timers/${timerId}/history`);

    return actionSuccess(actionName);
}
