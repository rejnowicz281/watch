"use client";

import { deleteTimer } from "@/actions/timers";
import AsyncButton from "@/components/AsyncButton";
import { BsTrash } from "react-icons/bs";
import css from "./index.module.css";

export default function DeleteButton({ id }) {
    return <AsyncButton className={css.button} mainAction={() => deleteTimer(id)} content={<BsTrash />} />;
}
