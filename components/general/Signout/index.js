import Link from "next/link";
import { BiExit } from "react-icons/bi";
import css from "./index.module.css";

export default function Signout() {
    return (
        <Link className={css.link} href="/api/auth/signout">
            <BiExit />
        </Link>
    );
}
