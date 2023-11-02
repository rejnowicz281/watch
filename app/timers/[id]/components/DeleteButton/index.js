"use client";

import AsyncButton from "@/components/AsyncButton";

export default function DeleteButton({ timerId, action }) {
    return <AsyncButton mainAction={() => action(timerId)} content="Delete Timer" loadingContent="Deleting..." />;
}
