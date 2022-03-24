' use strict ';

window.addEventListener('DOMContentLoaded', () => {
	// Tabs--------------------------------------------------

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

	// Timer--------------------------------------------------

	const deadline = '2022-03-31';

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
			}
		}
	}

	setClock('.timer', deadline);

	// Modal ------------------------------------------------------------------

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

	new MenuCard(
		'img/menu/fitness.png',
		'vegy',
		'«Фитнес»',
		'Меню «Фитнес - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		8,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/menu/premium.png',
		'elite',
		'«Премиум»',
		'В меню «Премиум» используем красивый дизайн упаковки и качественное исполнение блюд. Красная рыба, орехи, морепродукты, фрукты — ресторанное меню без похода в дорогой ресторан!',
		18,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/menu/post.png',
		'post',
		'«Постное»',
		'Меню «Постное» - это тщательный подбор продуктов: отсутствие мяса,молоко из миндаля, овса, кокоса, правильное количество белков за счет тофу и вегетарианских стейков.',
		15,
		'.menu .container',
		'menu__item'
	).render();

	// Forms -------------------------------------------------------------------------------------
	const forms = document.querySelectorAll("form");
	const message = {
		loading: 'Загрузка',
		success: 'Спасибо! Наш менеджер свяжется с вами в течение 5 минут.',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const request = new XMLHttpRequest();

			const statusMessage = document.createElement("div");
			statusMessage.classList.add('lds-ellipsis');
			statusMessage.innerHTML=`
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					`;
			form.append(statusMessage);

			request.open('POST', 'http://192.168.0.103:8099/api/form');
			request.setRequestHeader('Content-type', 'application/json');

			const formData = new FormData(form);
			const object = {};

			formData.forEach((value, key) => {
				object[key] = value;
			});

			request.send(JSON.stringify(object));

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset();
					statusMessage.remove();
				} else {
					console.log(request.response);
					showThanksModal(message.failure);
					statusMessage.remove();
				}
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

});