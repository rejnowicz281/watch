"use client";

import { useModalStore } from "@/store";
import { FiSettings } from "react-icons/fi";
import TimerSettings from "../TimerSettings";
import css from "./index.module.css";

export default function SettingsButton({ id, length, name }) {
    const { setModalContent } = useModalStore();

    return (
        <button
            className={css.button}
            onClick={() => setModalContent(<TimerSettings name={name} id={id} length={length} />)}
        >
            <FiSettings />
        </button>
    );
}
