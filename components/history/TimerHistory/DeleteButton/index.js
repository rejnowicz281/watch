"use client";

import { deleteHistoryEntry } from "@/actions/timers";
import SubmitButton from "@/components/history/TimerHistory/SubmitButton";
import css from "./index.module.css";

export default function DeleteButton({ timerId, entryId }) {
    return (
        <form action={deleteHistoryEntry}>
            <input type="hidden" name="timerId" value={timerId} />
            <input type="hidden" name="entryId" value={entryId} />
            <SubmitButton className={css.button} content={`Delete Entry`} loading={"Deleting..."} />
        </form>
    );
}
