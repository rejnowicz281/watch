"use client";

import { saveHistoryEntry } from "@/actions/timers";
import SubmitButton from "@/components/general/SubmitButton";
import formatSeconds from "@/utils/general/formatSeconds";
import { useRef, useState } from "react";
import css from "./index.module.css";

export default function SaveHistoryEntry({ onSaveSuccess, id, length, secondsPassed }) {
    const formRef = useRef(null);
    const [errors, setErrors] = useState([]);

    async function handleAction(formData) {
        setErrors([]);

        const response = await saveHistoryEntry(formData, length, secondsPassed);

        if (!response.success) setErrors(response.errors);
        else {
            formRef.current?.reset();
            onSaveSuccess();
        }
    }

    return (
        <>
            <p className={css.heading}>Save to history</p>
            <form className={css.form} action={handleAction} ref={formRef}>
                <input type="hidden" name="timer" value={id} />
                <input className={css.input} type="text" name="note" placeholder="Leave a note (optional)" />
                {errors?.seconds_passed?.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                <SubmitButton
                    className={css.button}
                    content={`Save To History (${formatSeconds(secondsPassed)} / ${formatSeconds(length)})`}
                    loading="Saving..."
                />
            </form>
        </>
    );
}
