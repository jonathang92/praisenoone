import { writable, derived } from 'svelte/store';
import content from '../data/content.json';

type Language = 'en' | 'es';

function createI18nStore() {
    let initialLang: Language = 'es';

    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('language_preference') as Language;
        if (saved === 'en' || saved === 'es') {
            initialLang = saved;
        }
    }

    const { subscribe, set, update } = writable<Language>(initialLang);

    return {
        subscribe,
        set: (lang: Language) => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('language_preference', lang);
            }
            set(lang);
        },
        toggle: () => update(lang => {
            const newLang = lang === 'en' ? 'es' : 'en';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('language_preference', newLang);
            }
            return newLang;
        })
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
