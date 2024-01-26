"use client";

import { createTimer } from "@/actions/timers";
import SubmitButton from "@/components/history/TimerHistory/SubmitButton";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import css from "./index.module.css";

export default function CreateTimer() {
    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(false);

    async function handleAction(formData) {
        const lengthInput = formData.get("length");

        if (lengthInput !== "" && lengthInput > 0) {
            setErrors(null);

            const res = await createTimer(formData);

            if (res.success) setOpen(false);
            else setErrors(JSON.stringify(res.errors));
        }
    }

    useEffect(() => {
        if (!open) setErrors(null);
    }, [open]);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className={css["trigger-button"]}>
                    <IoIosAdd />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={css["dialog-overlay"]} />
                <Dialog.Content className={css["dialog-content"]}>
                    <Dialog.Title className={css["dialog-title"]}>Create Timer</Dialog.Title>
                    <Dialog.Description className={css["dialog-description"]}>
                        {errors ? errors : "Create a new timer. Click save when you're done."}
                    </Dialog.Description>
                    <form action={handleAction}>
                        <fieldset className={css.fieldset}>
                            <label className={css.label} htmlFor="name">
                                Name
                            </label>
                            <input className={css.input} id="name" name="name" defaultValue="Untitled Timer" />
                        </fieldset>
                        <fieldset className={css.fieldset}>
                            <label className={css.label} htmlFor="length">
                                Length
                            </label>
                            <input className={css.input} id="length" name="length" defaultValue="10" />
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
