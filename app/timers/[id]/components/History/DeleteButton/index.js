"use client";

import AsyncButton from "@components/AsyncButton";

export default function DeleteButton({ action, timerId, entryId }) {
    return (
        <AsyncButton mainAction={() => action(timerId, entryId)} content="Delete Entry" loadingContent="Deleting..." />
    );
}
