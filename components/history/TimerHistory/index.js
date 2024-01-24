import { formatDate } from "@/utils/general/formatDate";
import formatSeconds from "@/utils/general/formatSeconds";
import DeleteButton from "./DeleteButton";
import css from "./index.module.css";

export default function TimerHistory({ history, id }) {
    return (
        <div className={css.container}>
            <h1 className={css.heading}>History</h1>
            {history.map((entry) => (
                <div className={css.entry} key={entry.id}>
                    <h2>
                        {formatSeconds(entry.seconds_passed)} / {formatSeconds(entry.timer_length)}
                    </h2>
                    <p>{formatDate(entry.createdAt)}</p>
                    {entry.note && <p className={css.note}>{entry.note}</p>}
                    <DeleteButton timerId={id} entryId={entry.id} />
                </div>
            ))}
        </div>
    );
}
