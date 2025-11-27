import { writable } from 'svelte/store';

export const isContactModalOpen = writable(false);

export function openContactModal() {
    isContactModalOpen.set(true);
}

export function closeContactModal() {
    isContactModalOpen.set(false);
}
