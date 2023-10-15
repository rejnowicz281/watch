"use client";

import useInterval from "@hooks/useInterval";
import formatSeconds from "@utils/formatSeconds";
import { useState } from "react";
import SaveHistoryEntry from "../SaveHistoryEntry";

export default function TimerInteractivity({ timerId, length, saveHistoryEntry }) {
    const [started, setStarted] = useState(false);
    const [stopped, setStopped] = useState(true);
    const [seconds, setSeconds] = useState(length);
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
        const response = await saveHistoryEntry(formData, timerId, secondsPassed);
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
        </div>
    );
}
