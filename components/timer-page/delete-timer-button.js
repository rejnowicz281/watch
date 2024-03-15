"use client";

import { deleteTimer } from "@/actions/timers";
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
import useTimerContext from "@/providers/timer-context";
import { BsTrash } from "@react-icons/all-files/bs/BsTrash";
import { useState } from "react";

export default function Delete() {
    const { id } = useTimerContext();
    const [open, setOpen] = useState(false);

    async function handleDelete(formData) {
        await deleteTimer(formData);
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className="flex-1 p-4 flex transition-colors justify-center hover:bg-gray-200 xl:flex-initial xl:hover:bg-transparent xl:hover:text-gray-300">
                    <BsTrash className="text-3xl" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to delete this timer along with it's entry history. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form className="flex flex-col" action={handleDelete}>
                        <input type="hidden" name="id" value={id} />

                        <AlertDialogAction asChild>
                            <SubmitButton content="Delete Timer" loading="Deleting..." />
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
