import { create } from "zustand";

export const useModalStore = create((set) => ({
    modalContent: null,
    setModalContent: (content) => set({ modalContent: content }),
    closeModal: () => set({ modalContent: null }),
}));

export const useTimerStore = create((set) => ({
    started: false,
    paused: true,
    seconds: 0,
    start: () => set({ started: true, paused: false }),
    pause: () => set({ paused: true }),
    end: () => set({ started: false, paused: true }),
    setSeconds: (s) => set({ seconds: s }),
}));
