"use client";

import useInterval from "@hooks/useInterval";
import formatSeconds from "@utils/formatSeconds";
import { experimental_useOptimistic as useOptimistic, useState } from "react";
import SaveHistoryEntry from "./SaveHistoryEntry";
import TimerSettings from "./TimerSettings";

export default function TimerInteractivity({ timerId, length, saveHistoryEntry, updateTimerLength }) {
    const [started, setStarted] = useState(false);
    const [stopped, setStopped] = useState(true);
    const [seconds, setSeconds] = useOptimistic(length);
    const [secondsPassed, setSecondsPassed] = useState(0);
    const [ended, setEnded] = useState(false);

    useInterval(countDown, stopped ? null : 1000);

    function start() {
        if (!started) {
            setStarted(true);
            setEnded(false);
        }

        setStopped(false);
    }

    function countDown() {
        if (seconds <= 0) {
            end();
        } else {
            setSeconds(seconds - 1);
        }
    }

    function stop() {
        setStopped(true);
    }

    function end() {
        setSecondsPassed(length - seconds);
        setSeconds(length);
        setStarted(false);
        setStopped(true);
        setEnded(true);
    }

    async function handleSaveToHistory(formData) {
        const response = await saveHistoryEntry(formData, timerId, length, secondsPassed);
        if (response.success) {
            setEnded(false);
            setStarted(false);
            setStopped(true);
        }
        return response;
    }

    return (
        <div>
            <p>{formatSeconds(seconds)}</p>
            <button onClick={stopped ? start : stop}>{!started ? "Start" : stopped ? "Resume" : "Stop"}</button>
            {started && <button onClick={end}>End</button>}
            {ended && <SaveHistoryEntry handleSave={handleSaveToHistory} secondsPassed={secondsPassed} />}
            {!started && (
                <TimerSettings
                    timerId={timerId}
                    length={length}
                    action={(new_length) => {
                        updateTimerLength(timerId, new_length);
                        setEnded(false);
                    }}
                />
            )}
        </div>
    );
}
