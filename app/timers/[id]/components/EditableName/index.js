"use client";

import { useState } from "react";

export default function EditableName({ action, name, timerId }) {
    const [nameInput, setNameInput] = useState(name);
    const [nameDisplay, setNameDisplay] = useState(name);
    const [editing, setEditing] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setEditing(false);
        if (nameInput != "") {
            setNameDisplay(nameInput);
            action(nameInput, timerId);
        } else {
            setNameInput(nameDisplay);
        }
    }

    if (editing)
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Type in name here"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <button>Update Name</button>
            </form>
        );
    else
        return (
            <button onClick={() => setEditing(true)}>
                <h1>{nameDisplay}</h1>
            </button>
        );
}
