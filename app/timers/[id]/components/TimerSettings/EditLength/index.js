"use client";

import { updateTimerLength } from "@/actions/timers";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import css from "./index.module.css";

export default function EditLength({ id, length }) {
    const [lengthInput, setLengthInput] = useState(length);

    function handleAction() {
        if (lengthInput != "" && lengthInput > 0) updateTimerLength(id, lengthInput);
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
                submitContent="Update Length (in seconds)"
                submittingContent="Updating..."
            />
        </form>
    );
}
