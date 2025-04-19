import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { fetch_data } from '$lib/fetchData';

fetch_data();

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app
