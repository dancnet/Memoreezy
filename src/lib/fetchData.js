// Fetches data from data.yml, parses it, and inserts it into the stores.

import { parse } from 'yaml';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.min.css';
import { cards, sections, questions, options } from '$lib/store';

const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        } else {
          return hljs.highlightAuto(code).value;
        }
      }
    })
  );

const gen_cards = (yamlCards, length) => {
    // { type: "txt" → text: "..." | type: "img" → url: "..." }
    let cards = [];
    for (let i=1; i<=length; i++) {
        let i_str = i.toString();
        if (i_str in yamlCards) {
            cards.push({
                type: 'txt',
                text: marked.parse(yamlCards[i_str])
            });
        } else {
            cards.push({
                type: 'img',
                url: i_str + '.jpg'
            });
        }
    }
    return cards;
}

const gen_sections = (yamlSections) => {
    // { name: string, card_id: int }
    let sections = [];
    if (yamlSections) {
        for (let [key, value] of Object.entries(yamlSections)) {
            sections.push({
                name: value,
                card_id: parseInt(key)-1
            });
        }
    }
    return sections;
}

const gen_questions = (yamlQuestions, length, cards) => {
    // { type: "txt" → text: "..." | type: "img" → url: "..." }
    let questions = [];
    if (length && length > 0) {
        for (let i=1; i<=length; i++) {
            let i_str = i.toString();
            if (i_str in yamlQuestions) {
                let question = {};
                let data = yamlQuestions[i_str];
                if ('question' in data) {
                    question['type'] = 'txt';
                    question['text'] = marked.parse(data['question']);
                } else {
                    question['type'] = 'img';
                    question['url'] = 'q' + i_str + '.jpg';
                }
                if ('answer' in data) {
                    question['answer'] = cards[data['answer']-1];
                }
                questions.push(question);
            } else {
                questions.push({
                    type: 'img',
                    url: 'q' + i_str + '.jpg'
                });
            }
        }
    }
    return questions;
};

const setTitle = (title) => {
    if (title) {
        document.title = title;
        document.querySelector('meta[name="apple-mobile-web-app-title"]').setAttribute('content', title);
    }
}

export const fetch_data = () => {
    fetch('data.yml')
    .then(res => res.text())
    .then(yamlData => {
        const data = parse(yamlData);
        const generated_cards = gen_cards(data.cards, data.length);
        cards.set(generated_cards);
        sections.set(gen_sections(data.sections));
        questions.set(gen_questions(data.questions, data.questions_length, generated_cards));
        options.set(data.options);
        setTitle(data.title)
    })
    .catch(err => {
        alert("Currently experiencing issues: " + err.message);
    });
}
