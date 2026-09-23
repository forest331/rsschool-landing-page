import { works } from './data.js'

const CARDS_INITIAL = 8
const cardContainer = document.getElementById('cards')
const categoriesContainer = document.getElementById('categories')
const showMoreBtn = document.getElementById('showMore')

let currentCategory = 'all'
let visibleCount = CARDS_INITIAL

function renderCards() {
	const filtered =
		currentCategory === 'all'
			? works
			: works.filter(w => w.category === currentCategory)

	const visible = filtered.slice(0, visibleCount)

	cardContainer.innerHTML = visible.map(createCardHTML).join('')

	if (showMoreBtn) {
		if (visibleCount >= filtered.length) {
			showMoreBtn.hidden = true
		} else {
			showMoreBtn.hidden = false
		}
	}
}

if (categoriesContainer) {
	categoriesContainer.addEventListener('click', e => {
		const btn = e.target.closest('.category')
		if (!btn) return

		currentCategory = btn.dataset.category
		visibleCount = CARDS_INITIAL

		categoriesContainer.querySelectorAll('.category').forEach(b => {
			b.classList.remove('category--active')
		})

		btn.classList.add('category--active')

		renderCards()
	})
}
function createCardHTML(work) {
	return `
 	<li class="card" data-id="${work.id}">
							<img
								class="card__image"
								src="${work.image}"
								alt="${work.title}"
								loading="lazy"
							/>
							<div class="card__body">
								<h2 class="card__title">${work.title}</h2>
								<p class="card__desc">${work.shortDesc}</p>
								<p class="card__meta">${work.basePrice} BYN</p>
							</div>
						</li>
 `
}

if (showMoreBtn) {
	showMoreBtn.addEventListener('click', () => {
		visibleCount += 4
		renderCards()
	})
}
renderCards()
