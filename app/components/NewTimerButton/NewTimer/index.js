"use client";

import { createTimer } from "@/actions/timers";
import SubmitButton from "@/components/SubmitButton";
import { useRef, useState } from "react";
import css from "./index.module.css";

export default function NewTimer({ onSuccess }) {
    const [errors, setErrors] = useState([]);
    const formRef = useRef(null);

    async function handleAction(formData) {
        setErrors([]);

        const response = await createTimer(formData);

        if (!response.success) setErrors(response.errors.length);
        else {
            formRef.current?.reset();
            onSuccess();
        }
    }

    return (
        <div className={css.container}>
            <p className={css.heading}>Add Timer</p>
            <form className={css.form} action={handleAction} ref={formRef}>
                <input className={css.input} type="text" name="name" placeholder="Timer Name" />
                <input className={css.input} type="number" name="length" placeholder="Timer Length" />
                <SubmitButton
                    className={css.submit}
                    submitContent="Create Timer"
                    submittingContent="Creating Timer..."
                />
            </form>
            {errors.map((error, idx) => (
                <p className={css.error} key={idx}>
                    {error}
                </p>
            ))}
        </div>
    );
}
