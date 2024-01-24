"use client";

import { deleteTimer } from "@/actions/timers";
import SubmitButton from "@/components/general/SubmitButton";
import { useModalStore } from "@/store";
import css from "./index.module.css";

export default function Confirm({ id }) {
    const { closeModal } = useModalStore();

    async function handleDelete(formData) {
        await deleteTimer(formData);
        closeModal();
    }

    return (
        <>
            <p className={css.sure}>Are you sure?</p>
            <form action={handleDelete}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton className={css.button} content={`Delete Timer`} loading={"Deleting..."} />
            </form>
        </>
    );
}
