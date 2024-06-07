import { UI } from './UI';
import fetchWeatherData from './fetchWeather';
import processData from './processData';

export default class Validate {
	static submitForm() {
		const searchTextContent = document.getElementById('search');
		const form = document.getElementById('form');
		form.onsubmit = (event) => {
			event.preventDefault();
			const formState = form.checkValidity();
			if (formState) {
				fetchWeatherData(searchTextContent.value)
					.then((weatherData) => {
						UI.generateAll(weatherData);
					})
					.catch((error) => {
						console.log(error);
						UI.generateError(
							'Error displaying weather data, please try again:',
							error,
						);
					});
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
		if (input.value.length < 3 || input.value.length > 30) {
			input.setCustomValidity('Input should be longer than 3 letters');
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
