' use strict';

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

let slideIndex = 1;
let offset = 0;

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
	if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
		offset = 0;
	} else {
		offset += +width.slice(0, width.length - 2);
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
		offset = +width.slice(0, width.length - 2) * (slides.length - 1);
	} else {
		offset -= +width.slice(0, width.length - 2);
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
		offset = +width.slice(0, width.length - 2) * (slideTo - 1);

		slidesField.style.transform = `translateX(-${offset}px)`;

		getZeroSlider();
		changeActiveColorDot();
	});
});