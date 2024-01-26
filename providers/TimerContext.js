"use client";

import { createContext, useContext, useState } from "react";

export const TimerContext = createContext();

export function TimerProvider({ children, initialLength, name, id, infinite = false }) {
    const length = infinite ? 0 : initialLength;
    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(true);
    const [seconds, setSeconds] = useState(length);

    function start() {
        setStarted(true);
        setPaused(false);
    }

    function pause() {
        setPaused(true);
    }

    function end() {
        setStarted(false);
        setPaused(true);
    }

    return (
        <TimerContext.Provider
            value={{
                started,
                paused,
                seconds,
                start,
                pause,
                end,
                setSeconds,
                length,
                id,
                name,
                infinite,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}

export default function useTimerContext() {
    const context = useContext(TimerContext);

    if (!context) throw new Error("useTimerContext must be used within a TimerContext Provider");

    return context;
}
