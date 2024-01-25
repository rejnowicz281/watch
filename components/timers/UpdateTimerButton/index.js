"use client";

import UpdateTimer from "@/components/timers/UpdateTimer";
import useTimerContext from "@/providers/TimerContext";

export default function UpdateTimerButton() {
    const { started } = useTimerContext();

    if (started) return null;
    else return <UpdateTimer />;
}
