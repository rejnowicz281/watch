import { getTimer } from "@/actions/timers";
import BackLink from "@/components/general/BackLink";
import Delete from "@/components/timers/Delete";
import HistoryLink from "@/components/timers/HistoryLink";
import TimerInteractivity from "@/components/timers/TimerInteractivity";
import UpdateTimerButton from "@/components/timers/UpdateTimerButton";
import { TimerProvider } from "@/providers/TimerContext";
import css from "./page.module.css";

export default async function TimerPage({ params: { id } }) {
    const timer = await getTimer(id);

    return (
        <TimerProvider id={id} name={timer.name} length={timer.length}>
            <div className={css.container}>
                <div className={css.top}>
                    <div>
                        <BackLink href={"/"} />
                    </div>
                    <div className={css.topright}>
                        <HistoryLink id={id} />
                        <Delete />
                        <UpdateTimerButton />
                    </div>
                </div>
                <div className={css.main}>
                    <h1 className={css.name}>{timer.name}</h1>
                    <TimerInteractivity />
                </div>
            </div>
        </TimerProvider>
    );
}
