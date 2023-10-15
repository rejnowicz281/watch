"use client";

import SubmitButton from "@components/SubmitButton";
import { useRef, useState } from "react";

export default function SaveHistoryEntry({ handleSave, secondsPassed }) {
    const formRef = useRef(null);
    const [errors, setErrors] = useState([]);

    async function handleAction(formData) {
        setErrors([]);

        const response = await handleSave(formData);

        if (!response.success) setErrors(response.errors);
        else formRef.current?.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="text" name="note" />
            {errors?.seconds_passed?.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            <SubmitButton submitContent={`Save To History (${secondsPassed} seconds)`} submittingContent="Saving..." />
        </form>
    );
}
