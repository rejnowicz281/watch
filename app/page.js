import { getTimers } from "@/actions/timers";
import Signout from "@/components/general/Signout";
import NewTimerButton from "@/components/timers/NewTimerButton";
import formatSeconds from "@/utils/formatSeconds";
import Link from "next/link";
import css from "./page.module.css";

export default async function Home() {
    const timers = await getTimers();

    return (
        <div className={css.container}>
            <div className={css.top}>
                <NewTimerButton />
                <Signout />
            </div>
            <div className={css.main}>
                <h1 className={css.heading}>Timers</h1>
                {timers.map((timer) => (
                    <Link key={timer.id} className={css["timer-link"]} href={`/timers/${timer.id}`}>
                        <h2 className={css["timer-name"]}>{timer.name}</h2>
                        <div className={css["timer-length"]}>{formatSeconds(timer.length)}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
