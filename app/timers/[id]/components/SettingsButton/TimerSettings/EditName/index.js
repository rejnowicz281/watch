"use client";

import { updateTimerName } from "@/actions/timers";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import css from "./index.module.css";

export default function EditName({ name, id }) {
    const [nameInput, setNameInput] = useState(name);

    function handleAction() {
        if (nameInput != "") updateTimerName(id, nameInput);
    }

    return (
        <form className={css.form} action={handleAction}>
            <input
                className={css.input}
                type="text"
                name="name"
                placeholder="Type in name here"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
            />
            <SubmitButton className={css.button} submitContent="Update Name" submittingContent="Updating..." />
        </form>
    );
}
