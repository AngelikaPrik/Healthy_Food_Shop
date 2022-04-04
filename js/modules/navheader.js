' use strict ';

function navigate() {
	const menuLink = document.querySelector('#menu'),
		calcLink = document.querySelector('#calc'),
		offerLink = document.querySelector('#offer-sale'),
		connectLink = document.querySelector('#connect');

	calcLink.addEventListener('click', () => scrollLink(event, 1800));
	menuLink.addEventListener('click', () => scrollLink(event, 2550));
	offerLink.addEventListener('click', () => scrollLink(event, 3350));
	connectLink.addEventListener('click', () => scrollLink(event, document.documentElement.scrollHeight));

	function scrollLink(event, value) {
		event.preventDefault();
		window.scrollBy(0, value);
	}
}

export default navigate;