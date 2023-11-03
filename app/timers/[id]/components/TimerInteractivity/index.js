"use client";

import useInterval from "@/hooks/useInterval";
import { useModalStore, useTimerStore } from "@/store";
import formatSeconds from "@/utils/formatSeconds";
import { useEffect } from "react";
import { CiStop1 } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { PiPauseLight } from "react-icons/pi";
import { RxResume } from "react-icons/rx";
import SaveHistoryEntry from "./SaveHistoryEntry";
import css from "./index.module.css";

export default function TimerInteractivity({ id, length }) {
    const { setModalContent, closeModal } = useModalStore();
    const { started, start, end, pause, paused, seconds, setSeconds } = useTimerStore();

    useEffect(() => {
        setSeconds(length);

        return () => end();
    }, []);

    useInterval(countDown, paused ? null : 1000);

    function countDown() {
        if (seconds <= 0) end();
        else setSeconds(seconds - 1);
    }

    function handleEnd() {
        setModalContent(
            <SaveHistoryEntry
                id={id}
                onSaveSuccess={handleSaveSuccess}
                secondsPassed={length - seconds}
                length={length}
            />
        );
        setSeconds(length);
        end();
    }

    function handleSaveSuccess() {
        end();
        closeModal();
    }

    return (
        <div>
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
        </div>
    );
}
