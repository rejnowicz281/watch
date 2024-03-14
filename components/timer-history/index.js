import { formatDate } from "@/utils/general/format-date";
import formatSeconds from "@/utils/general/format-seconds";
import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft";
import Link from "next/link";
import DeleteButton from "./delete-button";

export default function TimerHistory({ history, id }) {
    return (
        <>
            <div className="border-b border-b-gray-200 flex">
                <Link
                    className="flex-1 p-4 flex transition-colors justify-center hover:bg-gray-200 xl:flex-initial xl:hover:bg-transparent xl:hover:text-gray-300 xl:pl-8"
                    href={`/timers/${id}`}
                >
                    <BsArrowLeft className="text-3xl" />
                </Link>
            </div>
            <div className="p-8 flex flex-col gap-4">
                <h1 className="text-5xl xs:text-6xl">History</h1>
                <div className="flex flex-col gap-4">
                    {history.map((entry) => (
                        <div key={entry.id}>
                            <h2 className="text-2xl xs:text-4xl">
                                {entry.timer_length
                                    ? `${formatSeconds(entry.seconds_passed)} / ${formatSeconds(entry.timer_length)}`
                                    : `${formatSeconds(entry.seconds_passed)}`}
                            </h2>
                            <p>{formatDate(entry.createdAt)}</p>
                            <DeleteButton timerId={id} entryId={entry.id} />
                            {entry.note && <p>{entry.note}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
