"use client";

import useInterval from "@/hooks/useInterval";
import useTimerContext from "@/providers/TimerContext";
import formatSeconds from "@/utils/general/formatSeconds";
import { CiStop1 } from "@react-icons/all-files/ci/CiStop1";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import { PiPauseLight } from "@react-icons/all-files/pi/PiPauseLight";
import { RxResume } from "@react-icons/all-files/rx/RxResume";
import { useState } from "react";
import SaveHistoryEntry from "../SaveHistoryEntry";
import css from "./index.module.css";

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
            <h2 className={css.seconds}>{formatSeconds(started ? seconds : length)}</h2>
            <div className={css.buttons}>
                <button className={css.button} onClick={paused ? start : pause}>
                    {!started ? <FiPlay /> : paused ? <RxResume /> : <PiPauseLight />}
                </button>
                {started && (
                    <button className={`${css.button} ${css["stop-button"]}`} onClick={handleEnd}>
                        <CiStop1 />
                    </button>
                )}
            </div>
        </>
    );
}
