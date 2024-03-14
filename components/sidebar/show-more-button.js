"use client";

import { HiBars3 } from "@react-icons/all-files/hi2/HiBars3";
import { HiBars3BottomRight } from "@react-icons/all-files/hi2/HiBars3BottomRight";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ShowMoreButton = ({ TimersContainer }) => {
    const pathname = usePathname();
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const mainSectionChildren = document.getElementById("main-section-children");
        if (mainSectionChildren) {
            if (showMore) mainSectionChildren.style.display = "none";
            else mainSectionChildren.style.display = "flex";
        }
    }, [showMore]);

    // Hide show more section when route changes
    useEffect(() => {
        setShowMore(false);
    }, [pathname]);

    const showMoreContainer = () => {
        const mainSection = document.getElementById("main-section");

        if (mainSection) return createPortal(TimersContainer, mainSection);
    };

    return (
        <>
            {showMore && showMoreContainer()}
            <button
                onClick={() => setShowMore(!showMore)}
                className={clsx(
                    "flex-1 p-4 flex transition-colors justify-center hover:bg-gray-200",
                    showMore && "bg-gray-100"
                )}
            >
                {showMore ? <HiBars3BottomRight className="text-3xl" /> : <HiBars3 className="text-3xl" />}
            </button>
        </>
    );
};

export default ShowMoreButton;
