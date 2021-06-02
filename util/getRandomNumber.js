export const getRandomKey = () => {
	var x = '';
	for (var i = 0; i < 6; i++) {
		x += Math.floor(Math.random() * 6) + 1;
	}
	if (x === '123456') {
		x = '';
		for (var i = 0; i < 6; i++) {
			x += Math.floor(Math.random() * 6) + 1;
		}
	}
	return x;
};
