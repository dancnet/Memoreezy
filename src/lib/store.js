import { writable, derived } from 'svelte/store';
import { hashStore } from './hashStore';
import { RandomPile } from './randomPile';

export const cards = writable([]);
export const cards_random_pile = new RandomPile(cards);
export const sections = writable([]);
export const questions = writable([]);
export const questions_random_pile = new RandomPile(questions);
export const options = writable({});
export const hash = hashStore();

// Returns current item (card or question) based on URL.
export const current = derived([hash, cards, questions], ([$hash, $cards, $questions]) => {
    if ($hash.type === 'card') return {
        el: $cards[$hash.id],
        length: $cards.length
    }
    else if ($hash.type === 'question') return {
        el: $questions[$hash.id],
        length: $questions.length
    }
    else return null;
});