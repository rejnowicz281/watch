import { getTimer } from "@/actions/timers";
import Delete from "@/components/timer-page/delete-timer-button";
import HistoryLink from "@/components/timer-page/history-link";
import TimerInteractivity from "@/components/timer-page/timer-interactivity";
import UpdateTimerButton from "@/components/timer-page/update-timer/update-timer-button";
import { TimerProvider } from "@/providers/timer-context";

export default async function TimerPage({ id }) {
    const isInfinite = id === "infinite";
    const timer = isInfinite ? { name: "Infinite Timer" } : await getTimer(id);

    const providerProps = isInfinite
        ? { id, name: timer.name, infinite: true }
        : { id, name: timer.name, initialLength: timer.length };

    return (
        <TimerProvider {...providerProps}>
            <div className="flex-1 flex flex-col xl:flex-row-reverse">
                <div className="border-b border-b-gray-200 flex justify-evenly xl:flex-col xl:justify-center xl:w-[100px] xl:border-b-0">
                    <HistoryLink id={id} />
                    {!isInfinite && (
                        <>
                            <UpdateTimerButton />
                            <Delete />
                        </>
                    )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                    <h1 className="truncate text-center text-5xl xs:text-6xl mb-5">{timer.name}</h1>
                    <TimerInteractivity infinite={isInfinite} />
                </div>
            </div>
        </TimerProvider>
    );
}
