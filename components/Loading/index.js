import { AiOutlineLoading } from "react-icons/ai";
import css from "./index.module.css";

export default function Loading() {
    return (
        <div className={css.wrapper}>
            <AiOutlineLoading className={css.spinner} />
        </div>
    );
}
