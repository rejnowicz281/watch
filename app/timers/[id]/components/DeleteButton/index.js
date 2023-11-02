"use client";

import { useModalStore } from "@/store";
import { BsTrash } from "react-icons/bs";
import Confirm from "./Confirm";
import css from "./index.module.css";

export default function DeleteButton({ id }) {
    const { setModalContent } = useModalStore();

    return (
        <button onClick={() => setModalContent(<Confirm id={id} />)} className={css.button}>
            <BsTrash />
        </button>
    );
}
