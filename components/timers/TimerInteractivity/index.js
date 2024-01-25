"use client";

import useInterval from "@/hooks/useInterval";
import { useTimerStore } from "@/store";
import formatSeconds from "@/utils/general/formatSeconds";
import { useEffect, useState } from "react";
import { CiStop1 } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { PiPauseLight } from "react-icons/pi";
import { RxResume } from "react-icons/rx";
import SaveHistoryEntry from "../SaveHistoryEntry";
import css from "./index.module.css";

export default function TimerInteractivity({ id, length }) {
    const [showSave, setShowSave] = useState(false);
    const { started, start, end, pause, paused, seconds, setSeconds } = useTimerStore();

    useEffect(() => {
        setSeconds(length);

        return () => end();
    }, []);

    useInterval(countDown, paused ? null : 1000);

    function countDown() {
        if (seconds <= 0) handleEnd();
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
                    timerID={id}
                    length={length}
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
