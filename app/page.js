import { createTimer, getTimers } from "@/actions/timers";
import Link from "next/link";
import NewTimer from "./components/NewTimer";

export default async function Home() {
    const timers = await getTimers();

    return (
        <>
            <Link href="/api/auth/signout">Sign Out</Link>
            <NewTimer createTimer={createTimer} />
            <div>
                {timers.map((timer) => (
                    <li key={timer.id}>
                        <Link href={`/timers/${timer.id}`}>
                            {timer.name} | {timer.length}
                        </Link>
                    </li>
                ))}
            </div>
        </>
    );
}
