"use client";

import EditLength from "./EditLength";
import EditName from "./EditName";
import css from "./index.module.css";

export default function TimerSettings({ name, id, length }) {
    return (
        <>
            <p class={css.heading}>Settings</p>
            <EditName name={name} id={id} />
            <EditLength id={id} length={length} />
        </>
    );
}
