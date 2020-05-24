const neuburger = document.querySelector('.neuburger')
const changelings = document.querySelectorAll('.line:not(:nth-child(2n))')

neuburger.addEventListener('click', () => {
	changelings.forEach(s => {
		if (s.classList.contains('closed')) {
			s.classList.toggle('closed')
			setTimeout(() => s.classList.toggle('disappear'), 500)
		} else {
			s.classList.toggle('closed')
			s.classList.toggle('disappear')
		}
	})
})