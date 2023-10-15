"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

function SubmitButton({ className, submitContent, submittingContent }) {
    const { pending } = useFormStatus();

    return (
        <button className={className} disabled={pending} type="submit">
            {pending ? submittingContent : submitContent}
        </button>
    );
}

export default SubmitButton;
