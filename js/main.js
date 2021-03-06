import { flagBuilder } from './flags.js'
import { seek } from './seeker.js'

const HTML_RESPONSE = document.querySelector('#app')
const SEEKER = document.querySelector('#seeker')
const NAVBAR = document.querySelector('#navbar')
const TITLE = document.querySelector('#title')
const API_URL = 'https://covid-api.mmediagroup.fr/v1'

function begin() {
  fetch(`${API_URL}/cases?country=Spain`)
    .then((response) => response.json())
    .then((communities) => {
      toArray(communities).forEach((community) => {
        buildElements(community)
      })
    })
}

function toArray(communities) {
  const array = []
  for (const community in communities) {
    if (
      Object.hasOwnProperty.call(communities, community) &&
      community !== 'Unknown'
    ) {
      array.push({
        community: `${community}`,
        ...communities[community]
      })
    }
  }
  return array
}

function buildElements(community) {
  const card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.setAttribute('id', community.community)
  const cardImage = document.createElement('div')
  cardImage.setAttribute('class', 'card-image')
  const img = document.createElement('img')
  img.setAttribute('src', flagBuilder(community.community))
  img.setAttribute('loading', 'lazy')
  img.setAttribute('alt', community.community)
  cardImage.appendChild(img)
  card.appendChild(cardImage)

  const cardContent = document.createElement('div')
  cardContent.setAttribute('class', 'card-content')
  const cardContentH2 = document.createElement('h2')
  cardContentH2.appendChild(document.createTextNode(community.community))
  cardContent.appendChild(cardContentH2)
  const data = document.createElement('div')
  data.setAttribute('class', 'data')

  const info1 = document.createElement('div')
  info1.setAttribute('class', 'info')

  const info1i = document.createElement('i')
  info1i.setAttribute('class', 'fas fa-clinic-medical info-icon')
  info1.appendChild(info1i)

  const info1h3 = document.createElement('h3')
  info1h3.appendChild(document.createTextNode('CONFIRMADOS'))
  info1.appendChild(info1h3)

  const info1p = document.createElement('p')
  info1p.appendChild(
    document.createTextNode(community.confirmed.toLocaleString())
  )
  info1.appendChild(info1p)
  data.appendChild(info1)

  const info2 = document.createElement('div')
  info2.setAttribute('class', 'info')

  const info2i = document.createElement('i')
  info2i.setAttribute('class', 'fas fa-heart info-icon')
  info2.appendChild(info2i)

  const info2h3 = document.createElement('h3')
  info2h3.appendChild(document.createTextNode('RECUPERADOS'))
  info2.appendChild(info2h3)

  const info2p = document.createElement('p')
  info2p.appendChild(
    document.createTextNode(community.recovered.toLocaleString())
  )
  info2.appendChild(info2p)
  data.appendChild(info2)

  const info3 = document.createElement('div')
  info3.setAttribute('class', 'info')

  const info3i = document.createElement('i')
  info3i.setAttribute('class', 'fas fa-cross info-icon')
  info3.appendChild(info3i)

  const info3h3 = document.createElement('h3')
  info3h3.appendChild(document.createTextNode('MUERTES'))
  info3.appendChild(info3h3)

  const info3p = document.createElement('p')
  info3p.appendChild(document.createTextNode(community.deaths.toLocaleString()))
  info3.appendChild(info3p)
  data.appendChild(info3)

  cardContent.appendChild(data)

  card.appendChild(cardContent)
  HTML_RESPONSE.appendChild(card)
}

window.addEventListener('DOMContentLoaded', () => {
  begin()
  SEEKER.addEventListener('input', () => {
    seek(SEEKER.value)
  })
})

window.addEventListener('scroll', function () {
  if (
    TITLE.getBoundingClientRect().top <
    NAVBAR.getBoundingClientRect().bottom + 20
  ) {
    NAVBAR.classList.add('translucent')
  } else {
    NAVBAR.classList.remove('translucent')
  }
})
