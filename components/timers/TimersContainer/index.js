import { getTimers } from "@/actions/timers";
import NavLink from "@/components/general/NavLink";
import formatSeconds from "@/utils/general/formatSeconds";
import css from "./index.module.css";

export default async function TimersContainer() {
    const timers = await getTimers();

    return (
        <div className={css["timers-wrapper"]}>
            <div className={css.timers}>
                <NavLink href="/timers/infinite" className={css.timer} activeClassName={css["timer-active"]}>
                    <h3 className={css["timer-name"]}>Infinite Timer</h3>
                    <div className={css["timer-length"]}>∞</div>
                </NavLink>
                {timers.map((timer) => (
                    <NavLink
                        key={timer.id}
                        href={`/timers/${timer.id}`}
                        className={css.timer}
                        activeClassName={css["timer-active"]}
                    >
                        <h3 className={css["timer-name"]}>{timer.name}</h3>
                        <div className={css["timer-length"]}>{formatSeconds(timer.length)}</div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
