"use client";

import { deleteTimer } from "@/actions/timers";
import SubmitButton from "@/components/history/TimerHistory/SubmitButton";
import useTimerContext from "@/providers/TimerContext";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { BsTrash } from "react-icons/bs";
import css from "./index.module.css";

export default function Delete() {
    const { id } = useTimerContext();

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className={css["trigger-button"]}>
                    <BsTrash />
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className={css["alert-dialog-overlay"]} />
                <AlertDialog.Content className={css["alert-dialog-content"]}>
                    <AlertDialog.Title className={css["alert-dialog-title"]}>
                        Are you absolutely sure?
                    </AlertDialog.Title>
                    <AlertDialog.Description className={css["alert-dialog-description"]}>
                        You are about to delete this timer along with it's entry history. This action cannot be undone.
                    </AlertDialog.Description>
                    <div className={css["confirm-buttons"]}>
                        <AlertDialog.Cancel asChild>
                            <button className={css["cancel-button"]}>Cancel</button>
                        </AlertDialog.Cancel>

                        <form action={deleteTimer}>
                            <input type="hidden" name="id" value={id} />
                            <SubmitButton
                                className={css["delete-button"]}
                                content={`Yes, Delete Timer`}
                                loading={"Deleting..."}
                            />
                        </form>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
