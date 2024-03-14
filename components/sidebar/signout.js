import { GiExitDoor } from "@react-icons/all-files/gi/GiExitDoor";
import Link from "next/link";

export default function Signout() {
    return (
        <Link
            className="flex-1 p-4 flex transition-colors justify-center hover:bg-gray-200 lg:items-center lg:gap-1 lg:border lg:border-gray-200 lg:rounded-full lg:p-2 lg:hover:bg-gray-100"
            href="/api/auth/signout"
        >
            <GiExitDoor className="text-3xl" />
            <div className="hidden lg:block">Logout</div>
        </Link>
    );
}
