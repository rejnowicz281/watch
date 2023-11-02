"use client";

import SubmitButton from "@/components/SubmitButton";
import { useRef, useState } from "react";

export default function NewTimer({ createTimer }) {
    const [errors, setErrors] = useState([]);
    const formRef = useRef(null);

    async function handleAction(formData) {
        setErrors([]);

        const response = await createTimer(formData);

        if (!response.success) setErrors(response.errors.length);
        else formRef.current?.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="text" name="name" placeholder="Timer Name" />
            <input type="number" name="length" placeholder="Timer Length" />
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            <SubmitButton submitContent="Add List" submittingContent="Adding List..." />
        </form>
    );
}
