import { getTimerHistory } from "@/actions/timers";
import BackLink from "@/components/general/BackLink";
import TimerHistory from "@/components/history/TimerHistory";
import css from "./page.module.css";

export default async function HistoryPage({ params: { id } }) {
    const history = await getTimerHistory(id);

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <BackLink href={`/timers/${id}`} />
                <TimerHistory history={history} id={id} />
            </div>
        </div>
    );
}
