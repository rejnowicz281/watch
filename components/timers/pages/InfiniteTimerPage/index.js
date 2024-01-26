import HistoryLink from "@/components/timers/HistoryLink";
import TimerInteractivity from "@/components/timers/TimerInteractivity";
import { TimerProvider } from "@/providers/TimerContext";
import css from "../index.module.css";

export default function InfiniteTimerPage() {
    return (
        <TimerProvider id="infinite" name="Infinite Timer" infinite={true}>
            <div className={css.container}>
                <div className={css.main}>
                    <h1 className={css.name}>Infinite Timer</h1>
                    <TimerInteractivity infinite={true} />
                </div>
                <div className={css.right}>
                    <HistoryLink id="infinite" />
                </div>
            </div>
        </TimerProvider>
    );
}
