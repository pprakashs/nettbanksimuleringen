const date = new Date();
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

function getSlice(d) {
	if (parseInt(d) < 10) {
		return `0${d}`;
	}
	return d;
}

export const getDate = (value) => {
	let d = new Date(date.getTime());
	d.setDate(date.getDate() - value);

	return `${getSlice(d.getDate())}.${months[d.getMonth()]}.${d.getFullYear().toString().substr(-2)}`;
};

export const getDateFuture = (value) => {
	let d = new Date(date.getTime());
	d.setDate(date.getDate() + value);

	return `${getSlice(d.getDate())}.${months[d.getMonth()]}.${d.getFullYear().toString().substr(-2)}`;
};

export const getTodayDate = () => {
	return `${getSlice(date.getDate())}.${months[date.getMonth()]}.${date.getFullYear().toString().substr(-2)}`;
};
export const getTodayFullDate = () => {
	return `${getSlice(date.getDate())}.${months[date.getMonth()]}.${date.getFullYear()}`;
};
