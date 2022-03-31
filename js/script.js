window.addEventListener('DOMContentLoaded', () => {

	const tabs = require('./modules/tabs'),
		slider = require('./modules/slider'),
		calculating = require('./modules/calculating'),
		cards = require('./modules/cards'),
		forms = require('./modules/forms'),
		timer = require('./modules/timer'),
		modal = require('./modules/modal');

	tabs();
	slider();
	calculating();
	cards();
	forms();
	timer();
	modal();
});