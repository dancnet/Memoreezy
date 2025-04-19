// Create a svelte store in sync with the URL hash.

import { writable } from 'svelte/store';

export const hashStore = () => {
    // Object format: { type: "card" | "question", id: <integer> }
    const parseHash = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#q')) return {
            type: 'question',
            id: parseInt(hash.slice(2))
        }
        else if (hash.startsWith('#')) return {
            type: 'card',
            id: parseInt(hash.slice(1))
        }
        else return {
            type: 'card',
            id: 0
        }
    }

    const genHash = (value) => {
        if (value.type === 'question') return `#q${value.id}`
        else if (value.type === 'card') return `#${value.id}`
    }

    const initial = parseHash();
    const { subscribe, set } = writable(initial);

    window.addEventListener('hashchange', () => {
        set(parseHash());
    });

    return {
        subscribe,
        set(value) {
            location.hash = genHash(value);
        }
    }
}