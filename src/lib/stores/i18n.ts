import { writable, derived } from 'svelte/store';
import content from '../data/content.json';

type Language = 'en' | 'es';

function createI18nStore() {
    const { subscribe, set, update } = writable<Language>('es');

    return {
        subscribe,
        set,
        toggle: () => update(lang => lang === 'en' ? 'es' : 'en')
    };
}

export const currentLang = createI18nStore();

export const t = derived(currentLang, ($lang) => {
    return content.i18n[$lang];
});

export const contentData = derived(currentLang, ($lang) => {
    // Helper to access non-translated content easily if needed, 
    // or we can just import content.json directly in components for static data.
    return content;
});
