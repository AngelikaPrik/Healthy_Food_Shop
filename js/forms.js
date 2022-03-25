const forms = document.querySelectorAll("form");
const message = {
	loading: 'Загрузка',
	success: 'Спасибо! Наш менеджер свяжется с вами в течение 5 минут.',
	failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
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