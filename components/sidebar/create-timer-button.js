"use client";

import { createTimer } from "@/actions/timers";
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
import { IoIosAddCircleOutline } from "@react-icons/all-files/io/IoIosAddCircleOutline";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";

export default function UpdateTimer() {
    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(false);

    async function handleAction(formData) {
        const minutesInput = formData.get("minutes");
        const secondsInput = formData.get("seconds");
        const lengthInput = parseInt(minutesInput) * 60 + parseInt(secondsInput);
        formData.set("length", lengthInput);

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 p-4 flex transition-colors justify-center hover:bg-gray-200 lg:items-center lg:gap-1 lg:border lg:border-gray-200 lg:rounded-full lg:p-2 lg:hover:bg-gray-100">
                    <IoIosAddCircleOutline className="text-3xl" />
                    <div className="hidden lg:block">Create Timer</div>
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Timer</DialogTitle>
                    <DialogDescription>
                        {errors ? errors : "Create a timer. Length is in format mm:ss. Click save when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" action={handleAction}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" name="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="minutes" className="text-right">
                                Length
                            </Label>
                            <div className="col-span-3 flex items-center gap-3">
                                <Input
                                    className="border w-[70px] text-center"
                                    type="number"
                                    placeholder="00"
                                    name="minutes"
                                    min="0"
                                    id="minutes"
                                />
                                :
                                <Input
                                    className="border w-[70px] text-center"
                                    type="number"
                                    placeholder="00"
                                    name="seconds"
                                    min="0"
                                    max="59"
                                    id="seconds"
                                />
                            </div>
                        </div>
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
