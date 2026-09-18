;(function () {
	const STORAGE_KEY = 'a_tattoowork_theme'
	const root = document.documentElement
	const toggle = document.getElementById('themeToggle')
	const icon = toggle ? toggle.querySelector('.theme-toggle__icon') : null

	const savedTheme = localStorage.getItem(STORAGE_KEY)
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

	setTheme(initialTheme)

	if (toggle) {
		toggle.addEventListener('click', function () {
			const current = root.getAttribute('data-theme') || 'light'
			const next = current === 'light' ? 'dark' : 'light'
			setTheme(next)
			localStorage.setItem(STORAGE_KEY, next)
		})
	}

	function setTheme(theme) {
		root.setAttribute('data-theme', theme)

		if (icon) {
			icon.textContent = theme === 'dark' ? '☾' : '☀'
		}
	}
})()
