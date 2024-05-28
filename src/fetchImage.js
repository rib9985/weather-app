export default async function fetchImage(searchImageText) {
	try {
		const img = document.querySelector('img');
		const response = await fetch(
			`https://api.giphy.com/v1/gifs/translate?api_key=h2qohzuFA88jV1yCN3EidYUeOPbJAwLj&s=${searchImageText}`,
			{
				mode: 'cors',
			},
		);
		const imageData = await response.json();
		img.src = imageData.data.images.original.url;
	} catch (error) {
		alert(`No gifs found! Error: ${error.message}`);
		console.error(error);
	}
}
