"use client";
import Signout from "@/components/general/Signout";
import CreateTimer from "@/components/timers/CreateTimer";
import { MdOutlineKeyboardArrowLeft } from "@react-icons/all-files/md/MdOutlineKeyboardArrowLeft";
import { MdOutlineKeyboardArrowRight } from "@react-icons/all-files/md/MdOutlineKeyboardArrowRight";
import { useState } from "react";
import css from "./index.module.css";

export default function Sidebar({ TimersContainer }) {
    const [open, setOpen] = useState(true);

    return (
        <>
            <aside
                onClick={open ? undefined : () => setOpen(!open)}
                className={open ? css["open-sidebar"] : css["collapsed-sidebar"]}
            >
                <div className={css["create-timer-wrapper"]}>
                    <CreateTimer />
                </div>
                <h2 className={css["timers-heading"]}>Timers</h2>
                {TimersContainer}
                <div className={css["signout-wrapper"]}>
                    <Signout />
                </div>
            </aside>
            <button onClick={() => setOpen(!open)} className={css.toggle}>
                {open ? <MdOutlineKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />}
            </button>
        </>
    );
}
