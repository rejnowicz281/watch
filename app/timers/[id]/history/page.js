import { getTimerHistory } from "@/actions/timers";
import TimerHistory from "@/components/timer-history";

export default async function HistoryPage({ params: { id } }) {
    const history = await getTimerHistory(id);

    return <TimerHistory history={history} id={id} />;
}
