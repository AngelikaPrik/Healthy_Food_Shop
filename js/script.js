window.addEventListener("DOMContentLoaded", () => {
	// Tabs--------------------------------------------------

	const tabsParent = document.querySelector(".tabheader__items"),
		tabsContent = document.querySelectorAll(".tabcontent"),
		tabs = document.querySelectorAll(".tabheader__item"),
		preview = document.querySelector(".preview"),
		bgImage = ["url('img/tabs/0.png')",
			"url('img/tabs/1.png')",
			"url('img/tabs/2.png')",
			"url('img/tabs/3.png')"
		],
		descMeal = document.querySelectorAll(".description-meal");

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.style.display = "none";
		});

		tabs.forEach(item => {
			item.classList.remove("tabheader__active");
		});

		descMeal.forEach(item => {
			item.style.display = "none";
		});
	}

	function showTabContent(i = 0) {
		tabs[i].classList.add("tabheader__active");
		tabsContent[i].style.display = "block";
		descMeal[i].style.display = " block";
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", event => {
		const target = event.target;

		if (target && target.classList.contains("tabheader__item")) {
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

	const deadline = "2022-03-31";

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			"total": t,
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
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
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

	setClock(".timer", deadline);

	// Modal ------------------------------------------------------------------

	const modalTrigger = document.querySelector("[data-modal]"),
		modal = document.querySelector(".modal"),
		modalCloseBtn = document.querySelector("[data-close]");

	modalTrigger.addEventListener("click", openModal);
	
	modalCloseBtn.addEventListener("click", closeModal);

	modal.addEventListener("click", event => {
		if (event.target === modal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", event => {
		if(event.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});

	function openModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}
	function closeModal() {
		modal.classList.add("hide");
		modal.classList.remove("show");
		document.body.style.overflow = "";
	}

	const modalTimerId = setTimeout(openModal, 10000);

	function showModalByScroll() {
		if ((window.pageYOffset + document.documentElement.clientHeight + 1) >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);
});