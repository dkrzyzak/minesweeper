export const fontColors: Record<number, string> = {
	0: '',
	1: '#429ada',
	2: '#4ab950',
	3: '#d2454e',
	4: '#a653df',
	5: '#e9cc56',
	6: '#a653df',
	7: '#a653df',
	8: '#a653df',
};

export const getBlockFontColor = (bombsAround: number) => {
	return fontColors?.[bombsAround] || 'yellow';
};
