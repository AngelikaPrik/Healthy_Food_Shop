' use strict ';

function navigate() {
	const menuLink = document.querySelector('#menu'),
		menuSection = document.querySelector('.menu'),
		calcLink = document.querySelector('#calc'),
		calcSection = document.querySelector('.calculating'),
		promoteLink = document.querySelector('#promote'),
		promotionSection = document.querySelector('.promotion'),
		connectLink = document.querySelector('#connect'),
		footerSection = document.querySelector('.footer');


	calcLink.addEventListener('click', e => setScrollIntoView(e, calcSection));
	menuLink.addEventListener('click', e => setScrollIntoView(e, menuSection, false));
	promoteLink.addEventListener('click', e => setScrollIntoView(e, promotionSection));
	connectLink.addEventListener('click', e => setScrollIntoView(e, footerSection));

	function setScrollIntoView(event, section, top = true) {
		event.preventDefault();
		section.scrollIntoView(top);
	}

}

export default navigate;