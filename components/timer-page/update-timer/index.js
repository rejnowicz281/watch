"use client";

import { updateTimer } from "@/actions/timers";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTimerContext from "@/providers/timer-context";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import { useEffect, useState } from "react";

export default function UpdateTimer() {
    const { setSeconds, id, name, length } = useTimerContext();

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 p-4 flex transition-colors justify-center hover:bg-gray-200 xl:flex-initial xl:hover:bg-transparent xl:hover:text-gray-300">
                    <FiSettings className="text-3xl" />
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Timer</DialogTitle>
                    <DialogDescription>
                        {errors ? errors : "Update timer. Click save when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" action={handleAction}>
                    <input type="hidden" name="id" value={id} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" defaultValue={name} name="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="length" className="text-right">
                            Length
                        </Label>
                        <Input id="length" name="length" defaultValue={length} className="col-span-3" />
                    </div>

                    <DialogFooter>
                        <Button asChild>
                            <SubmitButton content="Save Timer" loading="Saving..." />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
