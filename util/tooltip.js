function removeTooltip() {
	document.querySelectorAll('.tooltip-popup').forEach((tooltip) => {
		tooltip.remove();
	});
}

export const tooltip = () => {
	document.querySelectorAll('.tooltip').forEach((tooltip) => {
		tooltip.addEventListener('click', (e) => {
			const current = e.currentTarget;
			const markup = `<div class="bg-pink border-primary p-3 text-center text-xl max-w-md absolute tooltip-popup" style="left: ${
				current.offsetLeft - 20
			}px; top: ${current.offsetTop - 55}px">${e.currentTarget.getAttribute('data-tooltip-text')}</div>`;
			removeTooltip();
			document.querySelector('body').insertAdjacentHTML('beforeend', markup);
		});
	});
};
