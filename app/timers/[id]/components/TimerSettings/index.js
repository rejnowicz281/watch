"use client";

import EditLength from "./EditLength";
import EditName from "./EditName";

export default function TimerSettings({ name, id, length }) {
    return (
        <>
            <EditName name={name} id={id} />
            <EditLength id={id} length={length} />
        </>
    );
}
