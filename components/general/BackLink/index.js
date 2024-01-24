import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import css from "./index.module.css";

export default function BackLink({ href }) {
    return (
        <Link className={css.back} href={href}>
            <BsArrowLeft />
        </Link>
    );
}
