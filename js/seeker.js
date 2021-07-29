export function seek(toSeek) {
	let regExp = new RegExp(toSeek.toLowerCase());
	const cardCollection = document.getElementsByClassName("card");
	const cards = Array.from(cardCollection);
	cards.forEach((card) =>
		regExp.test(card.getAttribute("id").toLowerCase())
			? card.classList.remove("hidden")
			: card.classList.add("hidden")
	);
}
