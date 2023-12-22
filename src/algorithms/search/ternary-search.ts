const EPS = 0.000_000_001;

export default function ternarySearch(low: number, high: number, callback: (value: number) => number) {
	let best: number | undefined;

	while (true) {
		const middle0 = (2 * low + high) / 3;
		const middle1 = (low + 2 * high) / 3;

		const result0 = callback(middle0);
		const result1 = callback(middle1);

		if (result0 > result1) low = middle0;
		else high = middle1;

		if (best !== undefined && Math.abs(best - middle0) < EPS) break;
		best = middle0;
	}

	return best;
}
