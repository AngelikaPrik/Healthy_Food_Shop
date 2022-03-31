' use strict ';

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabActiveClass) {
	let tabsParent = document.querySelector(tabsParentSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabs = document.querySelectorAll(tabsSelector),
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
			item.classList.remove(tabActiveClass);
		});

		descMeal.forEach(item => {
			item.style.display = 'none';
		});
	}

	function showTabContent(i = 0) {
		tabs[i].classList.add(tabActiveClass);
		tabsContent[i].style.display = 'block';
		descMeal[i].style.display = 'block';
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', event => {
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;