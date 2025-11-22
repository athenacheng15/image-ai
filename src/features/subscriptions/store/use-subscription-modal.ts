import { create } from "zustand";

interface SubscriptionModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useSubscriptionModal = create<SubscriptionModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
