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