// Taken from... somewhere. If this was yours, please tell
// me so I can credit you. I definitely got it from Roblox though.

import fastGcd from "../gcd/fast-gcd";
import nextInteger from "../next-integer";

function getRandomRelativePrime(value: number, nextInteger: (min: number, max: number) => number) {
	if (value === 1) return 1;

	let newValue = nextInteger(1, value - 1);
	if (fastGcd(value, newValue) === 1) return newValue;

	do newValue = nextInteger(1, value - 1);
	while (fastGcd(value, newValue) !== 1);

	return newValue;
}

/**
 * ## LiveRandom
 *
 * Will loop through all of the numbers in range before repeating.
 * Does not use any table nor any messy bash, just math. B^)
 *
 * It first finds a co-prime integer to n between 1 and (n - 1) and constantly increments a running sum.
 *
 * - This is guaranteed to touch all of the integers.
 *
 * ### Complexity
 *
 * - **Storage:** `O(1)`
 * - **Construction:** `O(log(n))`
 * - **Get:** `O(1)`
 *
 * ### Example
 *
 * ```ts
 * const liveRandom = new LiveRandom(1, 10);
 * console.log(liveRandom.get());
 * ```
 */
export default class LiveRandom {
	public constructor(min: number, max?: number, getNextInteger: (min: number, max: number) => number = nextInteger) {
		if (max === undefined) [max, min] = [min, 1];

		const range = (this.range = max - min + 1);
		this.last = nextInteger(1, range);
		this.offset = min - 1;
		this.prime = getRandomRelativePrime(range, getNextInteger);
		this.range = range;
	}

	/**
	 * Peeks at the next value. This does not cause
	 * it to roll a new value.
	 */
	public peek() {
		const rigged = this.rigged;
		const top = rigged.at(-1);
		if (top !== undefined) return top;

		const value = this.last + this.prime;
		const range = this.range;
		return (value > range ? value - range : value) + this.offset;
	}

	/**
	 * Rigs the random number generator, which forces
	 * the next value to be the given value.
	 *
	 * @param value The value to rig with.
	 * @returns
	 */
	public rig(value: number) {
		this.rigged.push(value);
		return this;
	}

	/**
	 * Gets a random value.
	 * @returns
	 */
	public get() {
		const range = this.range;
		const rigged = this.rigged;
		const riggedValue = rigged.pop();
		if (riggedValue !== undefined) return riggedValue;

		const value = this.last + this.prime;
		const last = value > range ? value - range : value;
		this.last = last;
		return last + this.offset;
	}

	private last: number;
	private readonly offset: number;
	private readonly prime: number;
	private readonly range: number;
	private readonly rigged = new Array<number>();
}
