import { deleteHistoryEntry } from "@/actions/timers";
import formatSeconds from "@/utils/formatSeconds";
import DeleteButton from "./DeleteButton";

export default function History({ history, id }) {
    return (
        <>
            <h2>History</h2>
            <ul>
                {history.map((entry) => (
                    <li key={entry.id}>
                        <h3>
                            {formatSeconds(entry.seconds_passed)} / {formatSeconds(entry.timer_length)}
                        </h3>
                        <p>{entry.note}</p>
                        <p>({entry.createdAt.toString()})</p>
                        <DeleteButton action={deleteHistoryEntry} id={id} entryId={entry.id} />
                    </li>
                ))}
            </ul>
        </>
    );
}
