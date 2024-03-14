"use client";

import UpdateTimer from "@/components/timer-page/update-timer";
import useTimerContext from "@/providers/timer-context";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";

export default function UpdateTimerButton() {
    const { started } = useTimerContext();

    if (started)
        return (
            <button disabled={true} className="disabled:opacity-30 flex-1 p-4 flex transition-colors xl:flex-initial">
                <FiSettings className="text-3xl" />
            </button>
        );
    else return <UpdateTimer />;
}
