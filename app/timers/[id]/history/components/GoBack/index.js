import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import css from "./index.module.css";

export default function GoBack({ id }) {
    return (
        <Link className={css.back} href={`/timers/${id}`}>
            <BsArrowLeft />
        </Link>
    );
}
