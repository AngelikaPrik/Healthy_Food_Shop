/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculating.js":
/*!***********************************!*\
  !*** ./js/modules/calculating.js ***!
  \***********************************/
/***/ ((module) => {

' use strict ';

function calculating() {

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	calcTotal();
	initLocalSets('#gender div', 'calculating__choose-item_active');
	initLocalSets('.calculating__choose_big div', 'calculating__choose-item_active');

	getStaticInfo('#gender div', 'calculating__choose-item_active');
	getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
	getDynamicInfo('#height');
	getDynamicInfo('#weight');
	getDynamicInfo('#age');

	function initLocalSets(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(el => {
			el.classList.remove(activeClass);

			if (el.getAttribute('id') === localStorage.getItem('sex')) {
				el.classList.add(activeClass);
			}
			if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				el.classList.add(activeClass);
			}
		});
	}

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '__ ';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(el => {
			el.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(el => el.classList.remove(activeClass));
				e.target.classList.add(activeClass);
				calcTotal();
			});

		});
	}

	function getDynamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.value = '';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					localStorage.setItem('height', height);
					break;
				case 'weight':
					weight = +input.value;
					localStorage.setItem('weight', weight);
					break;
				case 'age':
					age = +input.value;
					localStorage.setItem('age', age);
					break;
			}

			calcTotal();
		});
	}
}

module.exports = calculating;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

' use strict ';

function cards() {
	class MenuCard {
		constructor(src, alt, title, description, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.description = description;
			this.price = price;
			this.transfer = 29.50;
			this.parent = document.querySelector(parentSelector);
			this.changeToUAH();
			this.classes = classes || 'menu__item';
		}
	
		changeToUAH() {
			this.price = Math.floor(this.price * this.transfer);
		}
	
		render() {
			const element = document.createElement('div');
	
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = ` 
					<div class="menu__image">
						<img src=${this.src} alt=${this.alt}>
					</div>
					<div class="menu__item-content">
						<div class="menu__item-subtitle">${this.title}</div>
						<div class="menu__item-descr">${this.description}</div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.price}</span>грн/день</div>
						</div>
					</div>
					`;
			this.parent.append(element);
		}
	}
	
	const getResource = async (url) => {
		const res = await fetch(url);
	
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};
	
	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
			});
		});
	
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

' use strict ';
function forms() {
	const form = document.querySelectorAll("form");
	const message = {
	loading: 'Загрузка',
	success: 'Спасибо! Наш менеджер свяжется с вами в течение 5 минут.',
	failure: 'Что-то пошло не так...'
};

form.forEach(item => {
	bindPostData(item);
});

const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return await res.json();
};

function bindPostData(form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const statusMessage = document.createElement("div");
		statusMessage.classList.add('lds-ellipsis');
		statusMessage.innerHTML = `
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		`;
		form.append(statusMessage);

		const formData = new FormData(form);

		const json = JSON.stringify(Object.fromEntries(formData.entries()));

		postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
				statusMessage.remove();
			}).finally(() => {
				form.reset();
			});
	});
}

function showThanksModal(message) {
	const prevModal = document.querySelector('.modal__dialog');

	prevModal.classList.add('hide');
	openModal();

	const thanksModal = document.createElement('div');
	thanksModal.classList.add('modal__dialog');

	thanksModal.innerHTML = `
	<div class="modal__content">
		<div data-close class="modal__close">&times;</div>
		<h3 class="modal__title">${message}</h3>
	</div>
	`;

	document.querySelector('.modal').append(thanksModal);

	setTimeout(() => {
		thanksModal.remove();
		prevModal.classList.add('show');
		prevModal.classList.remove('hide');
		closeModal();
	}, 4000);
}

/* fetch('http://localhost:3000/menu')
	.then(data => data.json())
	.then(res => console.log(res)); */
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

' use strict ';

function modal() {
	const modalTrigger = document.querySelector('[data-modal]'),
		modal = document.querySelector('.modal');

	modalTrigger.addEventListener('click', openModal);


	modal.addEventListener('click', event => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if ((window.pageYOffset + document.documentElement.clientHeight + 1) >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

' use strict';

function slider() {
	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),

		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),

		width = window.getComputedStyle(slidesWrapper).width,

		indicators = document.createElement('ol'),
		dots = [];

	let slideIndex = 1,
		offset = 0;


	getZeroSlider();

	slidesField.style.width = 100 * slides.length + '%';

	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	slides.forEach(slide => {
		slide.style.width = width;
	});

	function getZeroSlider() {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}

	function changeActiveColorDot() {
		dots.forEach(dot => {
			dot.style.backgroundColor = 'rgba(93, 216, 135, 0.5)';
		});

		dots[slideIndex - 1].style.backgroundColor = 'rgba(93, 216, 135, 1)';
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		indicators.append(dot);

		if (i == 0) {
			dot.style.backgroundColor = 'rgba(93, 216, 135, 1)';
		}

		dots.push(dot);
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		getZeroSlider();
		changeActiveColorDot();
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		getZeroSlider();
		changeActiveColorDot();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', e => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			getZeroSlider();
			changeActiveColorDot();
		});
	});
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

' use strict ';

function tabs() {
	const tabsParent = document.querySelector('.tabheader__items'),
	tabsContent = document.querySelectorAll('.tabcontent'),
	tabs = document.querySelectorAll('.tabheader__item'),
	preview = document.querySelector('.preview'),
	descMeal = document.querySelectorAll('.description-meal'),
	bgImage = ['url("img/tabs/0.png")',
		'url("img/tabs/1.png")',
		'url("img/tabs/2.png")',
		'url("img/tabs/3.png")'
	];

function hideTabContent() {
	tabsContent.forEach(item => {
		item.style.display = 'none';
	});

	tabs.forEach(item => {
		item.classList.remove('tabheader__active');
	});

	descMeal.forEach(item => {
		item.style.display = 'none';
	});
}

function showTabContent(i = 0) {
	tabs[i].classList.add('tabheader__active');
	tabsContent[i].style.display = 'block';
	descMeal[i].style.display = 'block';
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', event => {
	const target = event.target;

	if (target && target.classList.contains('tabheader__item')) {
		tabs.forEach((item, i) => {
			if (target == item) {
				hideTabContent();
				showTabContent(i);
				preview.style.backgroundImage = bgImage[i];
			}
		});
	}
});
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

' use strict ';

function timer() {
	const deadline = '2022-04-10';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);

				days.innerHTML = 0;
				hours.innerHTML = 0;
				minutes.innerHTML = 0;
				seconds.innerHTML = 0;
			}
		}
	}

	setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {

	const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
		slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
		calculating = __webpack_require__(/*! ./modules/calculating */ "./js/modules/calculating.js"),
		cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
		forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
		timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
		modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");

	tabs();
	slider();
	calculating();
	cards();
	forms();
	timer();
	modal();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map