import { bench, run } from "mitata";
import nextInteger from "../algorithms/math/next-integer";
import fastGcd, { fastGcdUseTemporary } from "../algorithms/math/gcd/fast-gcd";

export default async function benchmarkGcd(amount = 100) {
	const values = new Array<[a: number, b: number]>(amount).fill([1, 1]).map(() => {
		const a = nextInteger(1, 1_000_000);
		const b = nextInteger(1, 1_000_000);
		return [a, b];
	});

	bench("fastGcd", () => {
		for (const [a, b] of values) fastGcd(a, b);
	});

	bench("fastGcdUseTemporary", () => {
		for (const [a, b] of values) fastGcdUseTemporary(a, b);
	});

	await run({
		avg: true,
		json: false,
		colors: true,
		min_max: true,
		collect: false,
		percentiles: true,
	});
}
