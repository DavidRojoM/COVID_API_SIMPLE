const HTML_RESPONSE = document.querySelector("#app");
const API_URL = "https://covid-api.mmediagroup.fr/v1";

fetch(`${API_URL}/cases?country=Spain`)
	.then((response) => response.json())
	.then((comunities) => {
		const template = toArray(comunities).map(
			(comunity) => `
	<tr>
		<td>${comunity.comunity}</td><td>${comunity.confirmed}</td><td>${comunity.recovered}</td><td>${comunity.deaths}</td>
	</tr>
	`
		);
		HTML_RESPONSE.innerHTML = `<table border="1">
		<thead><td>Comunidad</td><td>Confirmados</td><td>Recuperados</td><td>Muertes</td></thead>
		<tbody>${template}</tbody>
		</table>`;
	});

function toArray(comunities) {
	let array = [];
	for (const comunity in comunities) {
		if (
			Object.hasOwnProperty.call(comunities, comunity) &&
			comunity != "Unknown"
		) {
			array.push({
				comunity: `${comunity}`,
				...comunities[comunity],
			});
		}
	}
	return array;
}
