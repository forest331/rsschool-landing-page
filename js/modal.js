const modal = document.getElementById('modal')
const modalImage = document.getElementById('modalImage')
const modalTitle = document.getElementById('modalTitle')
const modalDesc = document.getElementById('modalDesc')
const modalParams = document.getElementById('modalParams')
const modalSummary = document.getElementById('modalSummary')

let currentWork = null
let selectedSize = null
let selectedPlacement = null

export function openModal(work) {
	currentWork = work
	selectedSize = work.sizes[0]
	selectedPlacement = work.placements[0]

	modalImage.src = work.image
	modalImage.alt = work.title
	modalTitle.textContent = work.title
	modalDesc.textContent = work.fullDesc

	renderParams()
	renderSummary()

	modal.hidden = false
	document.body.style.overflow = 'hidden'
}

export function closeModal() {
	modal.hidden = true
	document.body.style.overflow = ''
}

function renderParams() {
	modalParams.innerHTML = `
    <div class="param">
      <p class="param__label">Размер</p>
      <ul class="param__options">
        ${currentWork.sizes
					.map(
						s => `
          <li>
            <button
              type="button"
              class="param__btn ${s.id === selectedSize.id ? 'param__btn--active' : ''}"
              data-type="size"
              data-id="${s.id}"
            >${s.label}</button>
          </li>
        `,
					)
					.join('')}
      </ul>
    </div>

    <div class="param">
      <p class="param__label">Зона нанесения</p>
      <ul class="param__options">
        ${currentWork.placements
					.map(
						p => `
          <li>
            <button
              type="button"
              class="param__btn ${p.id === selectedPlacement.id ? 'param__btn--active' : ''}"
              data-type="placement"
              data-id="${p.id}"
            >${p.label}</button>
          </li>
        `,
					)
					.join('')}
      </ul>
    </div>
  `
}

modalParams.addEventListener('click', e => {
	const btn = e.target.closest('.param__btn')
	if (!btn) return

	const type = btn.dataset.type
	const id = btn.dataset.id

	if (type === 'size') {
		selectedSize = currentWork.sizes.find(s => String(s.id) === id)
	} else if (type === 'placement') {
		selectedPlacement = currentWork.placements.find(p => String(p.id) === id)
	}

	renderSummary()
	const optionList = btn.closest('.param__options')
	const currentActive = optionList.querySelector('.param__btn--active')

	if (currentActive) {
		currentActive.classList.remove('param__btn--active')
	}
	btn.classList.add('param__btn--active')
})

function renderSummary() {
	modalSummary.innerHTML = `
    <p><strong>Цена:</strong> ${selectedSize.price} BYN</p>
    <p><strong>Длительность:</strong> ${currentWork.baseDuration}</p>
    <p><strong>Зона:</strong> ${selectedPlacement.label}</p>
  `
}

if (modal) {
	modal.addEventListener('click', e => {
		if (
			e.target.dataset.close === 'overlay' ||
			e.target.dataset.close === 'button'
		) {
			closeModal()
		}
	})

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && !modal.hidden) {
			closeModal()
		}
	})
}
