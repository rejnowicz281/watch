import { getTimer } from "@/actions/timers";
import DeleteButton from "./components/DeleteButton";
import GoBack from "./components/GoBack";
import History from "./components/History";
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
                    <DeleteButton id={id} />
                    <SettingsButton name={timer.name} id={id} length={timer.length} />
                </div>
            </div>
            <div className={css.main}>
                <h1 className={css.name}>{timer.name}</h1>
                <TimerInteractivity id={id} length={timer.length} />
            </div>
            {timer.history.length > 0 && <History history={timer.history} id={timer.id} />}
        </div>
    );
}
