import Link from "next/link";
import { AiOutlineHistory } from "react-icons/ai";
import css from "./index.module.css";

export default function HistoryLink({ id }) {
    return (
        <Link className={css.link} href={`/timers/${id}/history`}>
            <AiOutlineHistory />
        </Link>
    );
}
