export const getRandomNumbers = (quantity: number, max?: number) => {
	const set = new Set<number>();
	while (set.size < quantity) {
		set.add(Math.floor(Math.random() * (max || quantity)) + 1);
	}
	return Array.from(set);
};
