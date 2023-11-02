"use client";

import { updateTimerName } from "@/actions/timers";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

export default function EditName({ name, id }) {
    const [nameInput, setNameInput] = useState(name);

    function handleAction() {
        if (nameInput != "") updateTimerName(id, nameInput);
    }

    return (
        <form action={handleAction}>
            <input
                type="text"
                name="name"
                placeholder="Type in name here"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
            />
            <SubmitButton submitContent="Update Name" submittingContent="Updating..." />
        </form>
    );
}
