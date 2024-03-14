"use client";

import { saveHistoryEntry } from "@/actions/timers";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTimerContext from "@/providers/timer-context";
import formatSeconds from "@/utils/general/format-seconds";

import { useEffect, useState } from "react";

export default function SaveHistoryEntry({ onExit }) {
    const { seconds, id, length, infinite } = useTimerContext();

    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(true);
    const secondsPassed = length - seconds;

    async function handleAction(formData) {
        setErrors(null);

        const res = await saveHistoryEntry(formData, infinite ? seconds : secondsPassed, infinite ? null : length);

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save Entry</DialogTitle>
                    <DialogDescription>
                        {errors ? errors : "Save timer history entry. Click save when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" action={handleAction}>
                    <input type="hidden" name="timer" value={id} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="note" className="text-right">
                            Note
                        </Label>
                        <Input id="note" name="note" placeholder="(Optional)" className="col-span-3" />
                    </div>

                    <DialogFooter>
                        <Button asChild>
                            <SubmitButton
                                content={`Save Entry (${
                                    infinite
                                        ? formatSeconds(seconds)
                                        : `${formatSeconds(secondsPassed)} / ${formatSeconds(length)}`
                                })`}
                                loading="Saving Entry..."
                            />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
