"use client";

import { updateTimerLength } from "@/actions/timers";
import AsyncButton from "@/components/AsyncButton";
import { useState } from "react";

export default function EditLength({ id, length }) {
    const [lengthInput, setLengthInput] = useState(length);

    async function handleSubmit() {
        await updateTimerLength(id, lengthInput);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input type="number" value={lengthInput} onChange={(e) => setLengthInput(e.target.value)} />
            <AsyncButton type="submit" mainAction={handleSubmit} content="Update Length" loadingContent="Updating..." />
        </form>
    );
}
