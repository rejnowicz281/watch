import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import css from "./index.module.css";

export default function GoBack() {
    return (
        <Link className={css.back} href="/">
            <BsArrowLeft />
        </Link>
    );
}
