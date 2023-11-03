"use client";

import { updateTimerLength } from "@/actions/timers";
import SubmitButton from "@/components/SubmitButton";
import { useTimerStore } from "@/store";
import { useState } from "react";
import css from "./index.module.css";

export default function EditLength({ id, length }) {
    const [lengthInput, setLengthInput] = useState(length);
    const { setSeconds, end, started } = useTimerStore();

    async function handleAction() {
        if (lengthInput != "" && lengthInput > 0) {
            const res = await updateTimerLength(id, lengthInput);
            if (res.success) {
                setSeconds(lengthInput);
                end();
            }
        }
    }

    return (
        <form className={css.form} action={handleAction}>
            <input
                className={css.input}
                type="number"
                value={lengthInput}
                onChange={(e) => setLengthInput(e.target.value)}
            />
            <SubmitButton
                className={css.button}
                submitContent={`Update Length (in seconds${
                    started ? " - WARNING: This will end your current timer" : ""
                })`}
                submittingContent="Updating..."
            />
        </form>
    );
}
