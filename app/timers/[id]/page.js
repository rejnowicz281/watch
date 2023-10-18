import { deleteTimer, getTimer, saveHistoryEntry, updateTimerLength, updateTimerName } from "@actions/timers";
import DeleteButton from "./components/DeleteButton";
import EditableName from "./components/EditableName";
import History from "./components/History";
import TimerInteractivity from "./components/TimerInteractivity";

export default async function TimerPage({ params: { id } }) {
    const timer = await getTimer(id);

    return (
        <div>
            <EditableName action={updateTimerName} name={timer.name} timerId={id} />
            <DeleteButton action={deleteTimer} timerId={id} />
            <TimerInteractivity
                timerId={id}
                length={timer.length}
                saveHistoryEntry={saveHistoryEntry}
                updateTimerLength={updateTimerLength}
            />
            <hr />
            <History history={timer.history} timerId={timer.id} />
        </div>
    );
}
