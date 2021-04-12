const getDate = (value) => {
	const date = new Date();
	let d = new Date(date.getTime());
	d.setDate(date.getDate() - value);

	function getSlice(d) {
		if (parseInt(d) < 10) {
			return `0${d}`;
		}
		return d;
	}

	return `${getSlice(d.getDate())}.${getSlice(d.getMonth())}.${d.getFullYear().toString().substr(-2)}`;
};

export default getDate;
