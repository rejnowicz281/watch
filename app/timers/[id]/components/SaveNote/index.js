"use client";

import { useState } from "react";

export default function SaveHistoryEntry({ handleSave, secondsPassed }) {
    const [note, setNote] = useState("");

    function save(e) {
        e.preventDefault();
        handleSave(note);
        setNote("");
    }

    return (
        <form onSubmit={save}>
            <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
            <button>Save To History({secondsPassed})</button>
        </form>
    );
}
