import fetchWeatherData from './fetchWeather';

export default class Validate {
	static submitForm() {
		const searchTextContent = document.getElementById('search');
		const form = document.getElementById('form');
		form.onsubmit = (event) => {
			event.preventDefault();
			const formState = form.checkValidity();
			if (formState) {
				const weatherData = fetchWeatherData(searchTextContent.value);
			} else {
				return false;
			}
		};
	}

	static validateInput(input) {
		input.setCustomValidity('');
		const regEx = new RegExp('[a-zA-Z]+');

		if (input.value == null || input.value == undefined || input.value == '') {
			input.setCustomValidity(
				'You forgot to fill here! You cannot search empty values!',
			);
			input.reportValidity();
			return;
		}
		if (!regEx.test(input.value)) {
			input.setCustomValidity(
				'Input should not contain numbers and/or symbols',
			);
			input.reportValidity();
			return;
		}
		if (input.value.length < 1 || input.value.length > 30) {
			input.setCustomValidity('Input should be longer than 1 letter');
			input.reportValidity();
			return;
		}
		input.setCustomValidity('');
	}

	static addListeners() {
		const search = document.getElementById('search');
		search.addEventListener('input', () => Validate.validateInput(search));
	}
}
