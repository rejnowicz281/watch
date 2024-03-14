"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href, className, activeClassName, prefetch = true }) {
    const pathname = usePathname();

    const path = pathname === "/" ? "/timers/infinite" : pathname;

    const isActive = path.includes(href);

    return (
        <Link prefetch={prefetch} href={href} className={clsx(className, isActive && activeClassName)}>
            {children}
        </Link>
    );
}
