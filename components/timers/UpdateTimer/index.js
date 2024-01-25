"use client";

import { updateTimer } from "@/actions/timers";
import SubmitButton from "@/components/history/TimerHistory/SubmitButton";
import { useTimerStore } from "@/store";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import css from "./index.module.css";

export default function UpdateTimer({ id, name, length }) {
    const { setSeconds } = useTimerStore();

    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(false);

    async function handleAction(formData) {
        const lengthInput = formData.get("length");
        const nameInput = formData.get("name");

        if (lengthInput !== "" && lengthInput > 0 && !(lengthInput == length && nameInput == name)) {
            setErrors(null);

            const res = await updateTimer(formData);

            if (res.success) {
                setOpen(false);
                setSeconds(lengthInput);
            } else setErrors(JSON.stringify(res.errors));
        }
    }

    useEffect(() => {
        if (!open) setErrors(null);
    }, [open]);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className={css["trigger-button"]}>
                    <FiSettings />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={css["dialog-overlay"]} />
                <Dialog.Content className={css["dialog-content"]}>
                    <Dialog.Title className={css["dialog-title"]}>Update Timer</Dialog.Title>
                    <Dialog.Description className={css["dialog-description"]}>
                        {errors ? errors : "Update timer. Click save when you're done."}
                    </Dialog.Description>
                    <form action={handleAction}>
                        <input type="hidden" name="id" value={id} />
                        <fieldset className={css.fieldset}>
                            <label className={css.label} htmlFor="name">
                                Name
                            </label>
                            <input className={css.input} id="name" name="name" defaultValue={name} />
                        </fieldset>
                        <fieldset className={css.fieldset}>
                            <label className={css.label} htmlFor="length">
                                Length
                            </label>
                            <input className={css.input} id="length" name="length" defaultValue={length} />
                        </fieldset>
                        <div className={css["save-wrapper"]}>
                            <SubmitButton
                                className={css["save-button"]}
                                content="Save Timer"
                                loading="Saving Timer..."
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
