import { createTimer } from "@actions/timers";

export default function NewTimer() {
    return (
        <form action={createTimer}>
            <div>
                <input type="text" name="name" placeholder="Timer Name" />
                <input type="number" name="length" placeholder="Timer Length" />
                <button>Add Timer</button>
            </div>
        </form>
    );
}
