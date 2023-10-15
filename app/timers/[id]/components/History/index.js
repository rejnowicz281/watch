import { deleteHistoryEntry } from "@actions/timers";
import formatSeconds from "@utils/formatSeconds";
import DeleteButton from "./DeleteButton";

export default function History({ history, timerLength, timerId }) {
    return (
        <>
            <h2>History</h2>
            <ul>
                {history.map((entry) => (
                    <li key={entry.id}>
                        <h3>
                            {formatSeconds(entry.seconds_passed)} / {formatSeconds(timerLength)}
                        </h3>
                        <p>{entry.note}</p>
                        <p>({entry.createdAt.toString()})</p>
                        <DeleteButton action={deleteHistoryEntry} timerId={timerId} entryId={entry.id} />
                    </li>
                ))}
            </ul>
        </>
    );
}
