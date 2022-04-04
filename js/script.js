import 'nodelist-foreach-polyfill';
import 'es6-promise-polyfill';
import navigate from './modules/navheader';
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

	navigate();
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__active');
	slider({
		container: '.offer__slider',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current'
	});
	calculating();
	cards();
	forms('form', modalTimerId);
	timer('.timer', '2022-04-10');
	modal('[data-modal]', '.modal');
});