import { createTimer, getTimers } from "@/actions/timers";
import Link from "next/link";
import NewTimer from "./components/NewTimer";

export default async function Home() {
    const timers = await getTimers();

    return (
        <>
            <NewTimer createTimer={createTimer} />
            <div>
                {timers.map((timer) => (
                    <li>
                        <Link href={`/timers/${timer.id}`} key={timer.id}>
                            {timer.name} | {timer.length}
                        </Link>
                    </li>
                ))}
            </div>
        </>
    );
}
