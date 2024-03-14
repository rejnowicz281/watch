import { getTimers } from "@/actions/timers";
import NavLink from "@/components/general/nav-link";
import formatSeconds from "@/utils/general/format-seconds";
import { FaInfinity } from "@react-icons/all-files/fa/FaInfinity";

export default async function TimersContainer() {
    const timers = await getTimers();

    return (
        <>
            <NavLink
                href="/timers/infinite"
                className="min-w-0 truncate flex justify-between items-center gap-5 p-5 hover:bg-gray-200 transition-colors"
                activeClassName="bg-gray-200"
            >
                <h3 className="word-break text-lg font-semibold text-gray-700 truncate">Infinite Timer</h3>
                <div className="font-bold text-gray-500">
                    <FaInfinity className="text-2xl" />
                </div>
            </NavLink>
            {timers.map((timer) => (
                <NavLink
                    key={timer.id}
                    href={`/timers/${timer.id}`}
                    className="min-w-0 truncate flex justify-between items-center gap-5 p-5 hover:bg-gray-200 transition-colors"
                    activeClassName="bg-gray-200"
                >
                    <h3 className="word-break text-lg font-semibold text-gray-700 truncate">{timer.name}</h3>
                    <div className="font-bold text-gray-500">{formatSeconds(timer.length)}</div>
                </NavLink>
            ))}
        </>
    );
}
