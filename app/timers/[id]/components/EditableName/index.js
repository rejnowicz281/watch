"use client";

import SubmitButton from "@components/SubmitButton";
import { useState } from "react";

export default function EditableName({ action, name, timerId }) {
    const [editing, setEditing] = useState(false);

    async function handleAction(formData) {
        const res = await action(formData, timerId);

        if (res.success) setEditing(false);
    }

    if (editing)
        return (
            <form action={handleAction}>
                <input type="text" name="name" placeholder="Type in name here" defaultValue={name} />
                <SubmitButton submitContent="Update Name" submittingContent="Updating..." />
            </form>
        );
    else
        return (
            <button onClick={() => setEditing(true)}>
                <h1>{name}</h1>
            </button>
        );
}
