export default function TimerSettings({ action, length }) {
    return (
        <>
            <button onClick={() => action(length + 1)}>Seconds + 1</button>
            <button onClick={() => action(length + 60)}>Minutes + 1</button>
            <button onClick={() => action(length - 1)}>Seconds - 1</button>
            <button onClick={() => action(length - 60)}>Minutes - 1</button>
        </>
    );
}
