import tabs from './modules/tabs';
import slider from './modules/slider';
import calculating from './modules/calculating';
import cards from './modules/cards';
import forms from './modules/forms';
import timer from './modules/timer';
import modal from './modules/modal';
import {
	openModal
} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__active');
	slider();
	calculating();
	cards();
	forms('form', modalTimerId);
	timer('.timer', '2022-04-10');
	modal('[data-modal]', '.modal');
});