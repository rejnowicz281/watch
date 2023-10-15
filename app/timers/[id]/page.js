import { getTimer, saveHistoryEntry } from "@actions/timers";
import History from "./components/History";
import TimerInteractivity from "./components/TimerInteractivity";

export default async function TimerPage({ params: { id } }) {
    const timer = await getTimer(id);

    return (
        <div>
            <h1>{timer.name}</h1>
            <TimerInteractivity timerId={id} length={timer.length} saveHistoryEntry={saveHistoryEntry} />
            <hr />
            <History history={timer.history} timerLength={timer.length} />
        </div>
    );
}
