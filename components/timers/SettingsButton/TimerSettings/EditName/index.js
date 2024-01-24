"use client";

import { updateTimerName } from "@/actions/timers";
import SubmitButton from "@/components/general/SubmitButton";
import css from "./index.module.css";

export default function EditName({ name, id }) {
    return (
        <form className={css.form} action={updateTimerName}>
            <input type="hidden" name="id" value={id} />
            <input className={css.input} type="text" name="name" placeholder="Type in name here" defaultValue={name} />
            <SubmitButton className={css.button} content="Update Name" loading="Updating..." />
        </form>
    );
}
