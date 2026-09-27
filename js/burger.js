const burger = document.getElementById('burger')
const nav = document.getElementById('nav')

if (burger && nav) {
	let isOpen = false

	function burgerOpen() {
		nav.classList.add('nav--open')
		burger.classList.add('burger--open')
		document.body.style.overflow = 'hidden'
		isOpen = true
	}
	function burgerClose() {
		nav.classList.remove('nav--open')
		burger.classList.remove('burger--open')
		document.body.style.overflow = ''
		isOpen = false
	}
	burger.addEventListener('click', () => {
		isOpen ? burgerClose() : burgerOpen()
	})

	nav.querySelectorAll('.nav__link').forEach(link => {
		link.addEventListener('click', burgerClose)
	})

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && isOpen) burgerClose()
	})

	window.addEventListener('resize', () => {
		if (window.innerWidth > 768 && isOpen) burgerClose()
	})
}
