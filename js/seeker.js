export function seek(toSeek) {
  const regExp = new RegExp(toSeek.toLowerCase())
  const cards = Array.from(document.getElementsByClassName('card'))
  cards.forEach((card) =>
    regExp.test(card.getAttribute('id').toLowerCase())
      ? card.classList.remove('hidden')
      : card.classList.add('hidden')
  )
}
