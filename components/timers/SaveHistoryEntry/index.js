"use client";

import { saveHistoryEntry } from "@/actions/timers";
import SubmitButton from "@/components/history/TimerHistory/SubmitButton";
import useTimerContext from "@/providers/TimerContext";
import formatSeconds from "@/utils/general/formatSeconds";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import css from "./index.module.css";

export default function SaveHistoryEntry({ onExit }) {
    const { seconds, id, length } = useTimerContext();

    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(true);
    const secondsPassed = length - seconds;

    async function handleAction(formData) {
        setErrors(null);

        const res = await saveHistoryEntry(formData, length, secondsPassed);

        if (res.success) setOpen(false);
        else setErrors(JSON.stringify(res.errors));
    }

    useEffect(() => {
        if (!open) {
            setErrors(null);
            onExit();
        }
    }, [open]);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className={css["dialog-overlay"]} />
                <Dialog.Content className={css["dialog-content"]}>
                    <Dialog.Title className={css["dialog-title"]}>Save Entry</Dialog.Title>
                    <Dialog.Description className={css["dialog-description"]}>
                        {errors ? errors : "Save timer history entry. Click save when you're done."}
                    </Dialog.Description>
                    <form action={handleAction}>
                        <input type="hidden" name="timer" value={id} />
                        <fieldset className={css.fieldset}>
                            <label className={css.label} htmlFor="note">
                                Note
                            </label>
                            <input className={css.input} placeholder="(Optional)" id="note" name="note" />
                        </fieldset>
                        <div className={css["save-wrapper"]}>
                            <SubmitButton
                                className={css["save-button"]}
                                content={`Save Entry (${formatSeconds(secondsPassed)} / ${formatSeconds(length)})`}
                                loading="Saving Entry..."
                            />
                        </div>
                    </form>
                    <Dialog.Close asChild>
                        <button className={css["icon-button"]} aria-label="Close">
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
