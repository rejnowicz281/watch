import { AiOutlineHistory } from "@react-icons/all-files/ai/AiOutlineHistory";
import Link from "next/link";

export default function HistoryLink({ id }) {
    return (
        <Link
            className="flex-1 p-4 flex transition-colors justify-center hover:bg-gray-200 xl:flex-initial xl:hover:bg-transparent xl:hover:text-gray-300"
            href={`/timers/${id}/history`}
        >
            <AiOutlineHistory className="text-3xl" />
        </Link>
    );
}
