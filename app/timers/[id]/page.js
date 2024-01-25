import { getTimer } from "@/actions/timers";
import BackLink from "@/components/general/BackLink";
import Delete from "@/components/timers/Delete";
import HistoryLink from "@/components/timers/HistoryLink";
import TimerInteractivity from "@/components/timers/TimerInteractivity";
import UpdateTimerButton from "@/components/timers/UpdateTimerButton";
import css from "./page.module.css";

export default async function TimerPage({ params: { id } }) {
    const timer = await getTimer(id);

    return (
        <div className={css.container}>
            <div className={css.top}>
                <div>
                    <BackLink href={"/"} />
                </div>
                <div className={css.topright}>
                    <HistoryLink id={id} />
                    <Delete id={id} />
                    <UpdateTimerButton name={timer.name} id={id} length={timer.length} />
                </div>
            </div>
            <div className={css.main}>
                <h1 className={css.name}>{timer.name}</h1>
                <TimerInteractivity id={id} length={timer.length} />
            </div>
        </div>
    );
}
