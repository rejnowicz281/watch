"use client";

import useInterval from "@/hooks/useInterval";
import { useModalStore } from "@/store";
import formatSeconds from "@/utils/formatSeconds";
import { useState } from "react";
import { CiStop1 } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { PiPauseLight } from "react-icons/pi";
import { RxResume } from "react-icons/rx";
import SaveHistoryEntry from "./SaveHistoryEntry";
import css from "./index.module.css";

export default function TimerInteractivity({ id, length }) {
    const { setModalContent, closeModal } = useModalStore();

    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(true);
    const [seconds, setSeconds] = useState(length);

    useInterval(countDown, paused ? null : 1000);

    function start() {
        if (!started) setStarted(true);

        setPaused(false);
    }

    function countDown() {
        if (seconds <= 0) end();
        else setSeconds(seconds - 1);
    }

    function stop() {
        setPaused(true);
    }

    function end() {
        setModalContent(
            <SaveHistoryEntry
                id={id}
                onSaveSuccess={handleSaveSuccess}
                secondsPassed={length - seconds}
                length={length}
            />
        );
        setSeconds(length);
        setStarted(false);
        setPaused(true);
    }

    function handleSaveSuccess() {
        setStarted(false);
        setPaused(true);
        closeModal();
    }

    return (
        <div>
            <h2 className={css.seconds}>{formatSeconds(seconds)}</h2>
            <div className={css.buttons}>
                <button className={css.button} onClick={paused ? start : stop}>
                    {!started ? <FiPlay /> : paused ? <RxResume /> : <PiPauseLight />}
                </button>
                {started && (
                    <button className={`${css.button} ${css["stop-button"]}`} onClick={end}>
                        <CiStop1 />
                    </button>
                )}
            </div>
        </div>
    );
}
