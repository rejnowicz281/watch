"use client";

import Modal from "@/components/Modal";
import { useModalStore } from "@/store";

export default function ModalWrapper() {
    const { modalContent } = useModalStore();

    if (modalContent) return <Modal content={modalContent} />;
    else return null;
}
