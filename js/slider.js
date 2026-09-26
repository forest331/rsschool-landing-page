const track = document.querySelector('.slider__track')
const prevBtn = document.querySelector('.slider__btn--prev')
const nextBtn = document.querySelector('.slider__btn--next')
const dots = document.querySelectorAll('.slider__dot')

if (track && prevBtn && nextBtn) {
	const slides = track.querySelectorAll('.slider__slide')
	const total = slides.length

	let currentIndex = 0

	function update() {
		track.style.transform = `translateX(-${currentIndex * 100}%)`

		dots.forEach((dot, i) => {
			dot.classList.toggle('slider__dot--active', i === currentIndex)
		})
	}

	prevBtn.addEventListener('click', () => {
		currentIndex = (currentIndex - 1 + total) % total
		update()
	})
	nextBtn.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % total
		update()
	})

	dots.forEach((dot, i) => {
		dot.addEventListener('click', () => {
			currentIndex = i
			update()
		})
	})

	update()
}
