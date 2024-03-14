"use client";

import useInterval from "@/hooks/use-interval";
import useTimerContext from "@/providers/timer-context";
import formatSeconds from "@/utils/general/format-seconds";
import { CiStop1 } from "@react-icons/all-files/ci/CiStop1";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import { PiPauseLight } from "@react-icons/all-files/pi/PiPauseLight";
import { RxResume } from "@react-icons/all-files/rx/RxResume";
import { useState } from "react";
import SaveHistoryEntry from "./save-history-entry";

export default function TimerInteractivity() {
    const [showSave, setShowSave] = useState(false);
    const { started, start, end, pause, paused, seconds, setSeconds, length, infinite } = useTimerContext();

    useInterval(countDown, paused ? null : 1000);

    function countDown() {
        if (infinite) setSeconds(seconds + 1);
        else if (seconds <= 0) handleEnd();
        else setSeconds(seconds - 1);
    }

    function handleEnd() {
        end();
        setShowSave(true);
    }

    return (
        <>
            {showSave && (
                <SaveHistoryEntry
                    onExit={() => {
                        setSeconds(length);
                        setShowSave(false);
                    }}
                />
            )}
            <div className="flex flex-col items-center">
                <h2 className="text-5xl xs:text-6xl mb-4">{formatSeconds(started ? seconds : length)}</h2>
                <div className="flex justify-center gap-1">
                    <button
                        className="text-5xl xs:text-6xl text-gray-800 hover:text-gray-400 transition-colors"
                        onClick={paused ? start : pause}
                    >
                        {!started ? <FiPlay /> : paused ? <RxResume /> : <PiPauseLight />}
                    </button>
                    {started && (
                        <button
                            className="text-5xl xs:text-6xl text-gray-800 hover:text-gray-400 transition-colors pl-2 ml-2 border-l-2 border-l-gray-400"
                            onClick={handleEnd}
                        >
                            <CiStop1 />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
