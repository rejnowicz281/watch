import { getTimers } from "@actions/timers";
import Link from "next/link";

export default async function Home() {
    const timers = await getTimers();

    return (
        <div>
            {timers.map((timer) => (
                <li>
                    <Link href={`/timers/${timer.id}`} key={timer.id}>
                        {timer.name} | {timer.length}
                    </Link>
                </li>
            ))}
        </div>
    );
}
