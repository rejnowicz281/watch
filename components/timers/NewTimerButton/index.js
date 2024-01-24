"use client";

import { useModalStore } from "@/store";
import { MdOutlineAddBox } from "react-icons/md";
import NewTimer from "./NewTimer";
import css from "./index.module.css";

export default function NewTimerButton() {
    const { setModalContent, closeModal } = useModalStore();

    return (
        <button onClick={() => setModalContent(<NewTimer onSuccess={closeModal} />)} className={css.button}>
            <MdOutlineAddBox />
        </button>
    );
}
