import Link from "next/link";
import css from "./index.module.css";

export default function Signout() {
    return (
        <Link className={css.link} href="/api/auth/signout">
            SIGN OUT
        </Link>
    );
}
