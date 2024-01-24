"use client";

import { updateTimerLength } from "@/actions/timers";
import SubmitButton from "@/components/general/SubmitButton";
import { useTimerStore } from "@/store";
import css from "./index.module.css";

export default function EditLength({ id, length }) {
    const { setSeconds, end, started } = useTimerStore();

    async function handleAction(formData) {
        const lengthInput = formData.get("length");

        if (lengthInput != "" && lengthInput > 0) {
            const res = await updateTimerLength(formData);
            if (res.success) {
                setSeconds(lengthInput);
                end();
            }
        }
    }

    return (
        <form className={css.form} action={handleAction}>
            <input type="hidden" name="id" value={id} />
            <input className={css.input} type="number" name="length" defaultValue={length} />
            <SubmitButton
                className={css.button}
                content={`Update Length (in seconds${started ? " - WARNING: This will end your current timer" : ""})`}
                loading="Updating..."
            />
        </form>
    );
}
