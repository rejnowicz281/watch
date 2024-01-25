"use client";

import UpdateTimer from "@/components/timers/UpdateTimer";
import { useTimerStore } from "@/store";

export default function UpdateTimerButton({ id, name, length }) {
    const { started } = useTimerStore();

    if (started) return null;
    else return <UpdateTimer id={id} name={name} length={length} />;
}
