export function seek(toSeek) {
	let regExp = new RegExp(toSeek.toLowerCase());
	const cards = document.getElementsByClassName("card");
	for (let i = 0; i < cards.length; i++) {
		if (!regExp.test(cards[i].getAttribute("id").toLowerCase())) {
			cards[i].classList.add("hidden");
		} else {
			cards[i].classList.remove("hidden");
		}
	}
}
