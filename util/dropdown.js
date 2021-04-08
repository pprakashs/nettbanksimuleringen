function hideDB(el) {
	el.classList.add('hidden');
	el.classList.add('opacity-0');
}
export const dropdown = (selector) => {
	const currentDP = selector.querySelector('.dropdown');

	document.querySelectorAll('.dropdown').forEach((el) => {
		const dwItems = el.querySelectorAll('li');

		if (currentDP === el) {
			currentDP.classList.toggle('hidden');
			setTimeout(() => {
				currentDP.classList.toggle('opacity-0');
			}, 20);
		} else {
			hideDB(el);
		}
		dwItems.forEach((item) => {
			item.addEventListener('click', function (e) {
				hideDB(el);
			});
		});
	});
};

export const bodyClick = () => {
	document.body.onclick = function (e) {
		// console.log(e.target);
	};
};
