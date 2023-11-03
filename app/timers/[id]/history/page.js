import { getTimerHistory } from "@/actions/timers";
import GoBack from "./components/GoBack";
import TimerHistory from "./components/TimerHistory";
import css from "./page.module.css";

export default async function HistoryPage({ params: { id } }) {
    const history = await getTimerHistory(id);

    return (
        <div className={css.container}>
            <GoBack id={id} />
            <TimerHistory history={history} id={id} />
        </div>
    );
}
