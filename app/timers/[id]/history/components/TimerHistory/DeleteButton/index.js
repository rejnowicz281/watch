"use client";

import AsyncButton from "@/components/AsyncButton";
import css from "./index.module.css";

export default function DeleteButton({ action, timerId, entryId }) {
    return (
        <AsyncButton
            className={css.button}
            mainAction={() => action(timerId, entryId)}
            content="Delete Entry"
            loadingContent="Deleting..."
        />
    );
}
