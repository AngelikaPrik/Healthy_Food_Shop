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

export default cards;