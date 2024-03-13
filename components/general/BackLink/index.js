import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft";
import Link from "next/link";
import css from "./index.module.css";

export default function BackLink({ href }) {
    return (
        <Link className={css.back} href={href}>
            <BsArrowLeft />
        </Link>
    );
}
