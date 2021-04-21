const panelAnimation = (container, sidePanel) => {
	const containerAnimation = new Promise((resolve, reject) => {
		setTimeout(() => {
			container.current.style.width = '855px';

			setTimeout(() => {
				resolve(true);
			}, 500);
		}, 100);
	});
	containerAnimation.then(() => {
		sidePanel.current.classList.remove('hidden');
		setTimeout(() => {
			sidePanel.current.style.opacity = 1;
		}, 50);
	});
};

export default panelAnimation;
