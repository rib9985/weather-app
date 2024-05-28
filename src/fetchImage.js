export default function fetchImage(searchImageText) {
	const img = document.querySelector('img');
	fetch(
		`https://api.giphy.com/v1/gifs/translate?api_key=h2qohzuFA88jV1yCN3EidYUeOPbJAwLj&s=${searchImageText}`,
		{
			mode: 'cors',
		},
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			img.src = response.data.images.original.url;
		})
		.catch(() => {
			console.error('No gifs found!');
			alert('No gifs found');
		});
}
