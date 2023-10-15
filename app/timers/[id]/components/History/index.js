import formatSeconds from "@utils/formatSeconds";

export default function History({ history, timerLength }) {
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
                    </li>
                ))}
            </ul>
        </>
    );
}
