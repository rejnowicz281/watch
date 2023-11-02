import { updateTimerLength } from "@/actions/timers";
import EditableName from "../EditableName";

export default function TimerSettings({ name, id, length }) {
    return (
        <>
            <EditableName name={name} id={id} />
            <button onClick={() => updateTimerLength(id, length + 1)}>Seconds + 1</button>
            <button onClick={() => updateTimerLength(id, length + 60)}>Minutes + 1</button>
            <button onClick={() => updateTimerLength(id, length - 1)}>Seconds - 1</button>
            <button onClick={() => updateTimerLength(id, length - 60)}>Minutes - 1</button>
        </>
    );
}
