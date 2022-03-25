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