"use client";

import { useModalStore } from "@/store";
import css from "./index.module.css";

export default function Modal() {
    const { closeModal, modalContent } = useModalStore();

    return (
        <>
            <div className={css.overlay} onClick={closeModal}></div>
            <div className={css.modal}>{modalContent}</div>
        </>
    );
}
