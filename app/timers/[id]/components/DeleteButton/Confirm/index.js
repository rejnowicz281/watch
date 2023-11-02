"use client";

import { deleteTimer } from "@/actions/timers";
import AsyncButton from "@/components/AsyncButton";
import { useModalStore } from "@/store";
import css from "./index.module.css";

export default function Confirm({ id }) {
    const { closeModal } = useModalStore();

    async function handleDelete() {
        await deleteTimer(id);
        closeModal();
    }

    return (
        <>
            <p className={css.sure}>Are you sure?</p>
            <AsyncButton
                className={css.button}
                mainAction={handleDelete}
                content="Delete Timer"
                loadingContent="Deleting..."
            />
        </>
    );
}
