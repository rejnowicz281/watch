"use client";

import { saveHistoryEntry } from "@/actions/timers";
import SubmitButton from "@/components/SubmitButton";
import { useRef, useState } from "react";

export default function SaveHistoryEntry({ onSaveSuccess, id, length, secondsPassed }) {
    const formRef = useRef(null);
    const [errors, setErrors] = useState([]);

    async function handleAction(formData) {
        setErrors([]);

        const response = await saveHistoryEntry(formData, id, length, secondsPassed);

        if (!response.success) setErrors(response.errors);
        else {
            formRef.current?.reset();
            onSaveSuccess();
        }
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="text" name="note" />
            {errors?.seconds_passed?.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            <SubmitButton
                submitContent={`Save To History (${secondsPassed} / ${length})`}
                submittingContent="Saving..."
            />
        </form>
    );
}
