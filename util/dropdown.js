export const dropdown = (selector) => {
	const currentDP = selector.current.querySelector('.dropdown');

	document.querySelectorAll('.dropdown').forEach((el) => {
		if (currentDP === el) {
			currentDP.classList.toggle('hidden');
			setTimeout(() => {
				currentDP.classList.toggle('opacity-0');
			}, 20);
		} else {
			el.classList.add('hidden');
			el.classList.add('opacity-0');
		}
	});
};

export const bodyClick = () => {
	document.body.onclick = function (e) {
		// console.log(e.target);
	};
};
