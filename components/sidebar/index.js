"use client";

import CreateTimerButton from "@/components/sidebar/create-timer-button";
import { MdOutlineKeyboardArrowLeft } from "@react-icons/all-files/md/MdOutlineKeyboardArrowLeft";
import clsx from "clsx";
import { useState } from "react";
import ShowMoreButton from "./show-more-button";
import Signout from "./signout";

export default function Sidebar({ TimersContainer }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            onClick={() => !open && setOpen(true)}
            className={clsx(
                "border-t border-t-gray-200 flex justify-evenly lg:border-t-0 lg:border-r lg:border-r-gray-200 lg:justify-normal lg:flex-col transition-all duration-300",
                open ? "lg:w-[350px]" : "lg:w-[100px] lg:hover:bg-gray-50 lg:cursor-pointer"
            )}
        >
            <div className="hidden lg:flex lg:pt-8 lg:px-6">
                <button
                    onClick={() => setOpen(!open)}
                    className={clsx(
                        "lg:flex lg:flex-1 lg:transition-colors lg:justify-center lg:gap-1 lg:border lg:border-gray-200 lg:rounded-full lg:p-2 lg:hover:bg-gray-100"
                    )}
                >
                    <MdOutlineKeyboardArrowLeft
                        className={clsx(
                            "text-3xl lg:transition-transform lg:duration-300",
                            open ? "lg:rotate-0" : "lg:rotate-180"
                        )}
                    />
                </button>
            </div>

            <div
                className={clsx(
                    "flex flex-1 lg:flex-initial lg:pt-4 lg:px-6 lg:transition-all lg:duration-700",
                    open ? "lg:opacity-100 lg:translate-x-0" : "lg:opacity-0 lg:-translate-x-96"
                )}
            >
                <Signout />
            </div>
            <div
                className={clsx(
                    "flex flex-1 lg:flex-initial lg:pb-8 lg:py-4 lg:px-6 lg:transition-all lg:duration-500",
                    open ? "lg:opacity-100 lg:translate-x-0" : "lg:opacity-0 lg:-translate-x-96"
                )}
            >
                <CreateTimerButton />
            </div>

            <div className="flex-1 flex lg:hidden">
                <ShowMoreButton TimersContainer={TimersContainer} />
            </div>
            <div
                className={clsx(
                    "hidden lg:flex-1 lg:flex lg:flex-col lg:border-t lg:border-t-gray-200 lg:relative lg:transition-all lg:duration-300",
                    open ? "lg:opacity-100 lg:translate-x-0" : "lg:opacity-0 lg:-translate-x-96"
                )}
            >
                <div className="absolute inset-0 overflow-y-auto">{TimersContainer}</div>
            </div>
        </div>
    );
}
