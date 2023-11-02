"use client";

import AsyncButton from "@/components/AsyncButton";

export default function DeleteButton({ action, id, entryId }) {
    return <AsyncButton mainAction={() => action(id, entryId)} content="Delete Entry" loadingContent="Deleting..." />;
}
