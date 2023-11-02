import { create } from "zustand";

export const useModalStore = create((set) => ({
    modalContent: null,
    setModalContent: (content) => set({ modalContent: content }),
    closeModal: () => set({ modalContent: null }),
}));
