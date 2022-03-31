import tabs from './modules/tabs';
import slider from './modules/slider';
import calculating from './modules/calculating';
import cards from './modules/cards';
import forms from './modules/forms';
import timer from './modules/timer';
import modal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	tabs();
	slider();
	calculating();
	cards();
	forms();
	timer();
	modal('[data-modal]', '.modal');
});