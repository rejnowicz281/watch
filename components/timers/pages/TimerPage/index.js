import { getTimer } from "@/actions/timers";
import Delete from "@/components/timers/Delete";
import HistoryLink from "@/components/timers/HistoryLink";
import TimerInteractivity from "@/components/timers/TimerInteractivity";
import UpdateTimerButton from "@/components/timers/UpdateTimerButton";
import { TimerProvider } from "@/providers/TimerContext";
import css from "../index.module.css";

export default async function TimerPage({ params: { id } }) {
    const timer = await getTimer(id);

    return (
        <TimerProvider id={id} name={timer.name} initialLength={timer.length}>
            <div className={css.wrapper}>
                <div className={css.container}>
                    <div className={css.main}>
                        <h1 className={css.name}>{timer.name}</h1>
                        <TimerInteractivity />
                    </div>
                    <div className={css.right}>
                        <HistoryLink id={id} />
                        <UpdateTimerButton />
                        <Delete />
                    </div>
                </div>
            </div>
        </TimerProvider>
    );
}
