"use client";

import { deleteHistoryEntry } from "@/actions/timers";
import SubmitButton from "@/components/general/submit-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function DeleteButton({ timerId, entryId }) {
    const [open, setOpen] = useState(false);

    async function handleDelete(formData) {
        await deleteHistoryEntry(formData);
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="font-bold text-red-600 transition-colors hover:text-red-300">
                Delete Entry
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to delete this timer history entry. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form className="flex flex-col" action={handleDelete}>
                        <input type="hidden" name="timer" value={timerId} />
                        <input type="hidden" name="entryId" value={entryId} />

                        <AlertDialogAction asChild>
                            <SubmitButton content="Delete Entry" loading="Deleting..." />
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
