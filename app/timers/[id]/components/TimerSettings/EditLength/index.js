"use client";

import { updateTimerLength } from "@/actions/timers";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

export default function EditLength({ id, length }) {
    const [lengthInput, setLengthInput] = useState(length);

    function handleAction() {
        if (lengthInput != "" && lengthInput > 0) updateTimerLength(id, lengthInput);
    }

    return (
        <form action={handleAction}>
            <input type="number" value={lengthInput} onChange={(e) => setLengthInput(e.target.value)} />
            <SubmitButton submitContent="Update Length" submittingContent="Updating..." />
        </form>
    );
}
