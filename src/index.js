const img = document.querySelector('img');
fetch(
	'https://api.giphy.com/v1/gifs/translate?api_key=h2qohzuFA88jV1yCN3EidYUeOPbJAwLj&s=cats',
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
	.catch(alert('No GIFs found!'));
