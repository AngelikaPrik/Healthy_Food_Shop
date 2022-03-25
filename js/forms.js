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

		const object = {};

		formData.forEach((value, key) => {
			object[key] = value;
		});

		fetch('http://192.168.0.103:8099/api/form', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(object)
		}).then(data => {
			console.log(data);
			showThanksModal(message.success);
			statusMessage.remove();
		}).catch(() => {
			console.log(request.response);
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
