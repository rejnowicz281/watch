import { getTimer } from "@/actions/timers";
import DeleteButton from "./components/DeleteButton";
import GoBack from "./components/GoBack";
import HistoryLink from "./components/HistoryLink";
import SettingsButton from "./components/SettingsButton";
import TimerInteractivity from "./components/TimerInteractivity";
import css from "./page.module.css";

export default async function TimerPage({ params: { id } }) {
    const timer = await getTimer(id);

    return (
        <div className={css.container}>
            <div className={css.top}>
                <div>
                    <GoBack />
                </div>
                <div className={css.topright}>
                    <HistoryLink id={id} />
                    <DeleteButton id={id} />
                    <SettingsButton name={timer.name} id={id} length={timer.length} />
                </div>
            </div>
            <div className={css.main}>
                <h1 className={css.name}>{timer.name}</h1>
                <TimerInteractivity id={id} length={timer.length} />
            </div>
        </div>
    );
}
