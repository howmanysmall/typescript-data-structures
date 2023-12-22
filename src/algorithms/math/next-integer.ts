/**
 * Returns a pseudorandom integer distributed over `[min, max]`.
 *
 * @param min - The minimum integer value, inclusive. Must be less than `max`.
 * @param max - The maximum integer value, inclusive. Must be greater than `min`.
 * @param safe - If `true`, `min` and `max` will be rounded to the nearest integer.
 * @returns A pseudorandom integer distributed over `[min, max]`.
 */
export default function nextInteger(min: number, max: number, safe = false) {
	if (safe) {
		min = Math.ceil(min);
		max = Math.floor(max);
	}

	return Math.floor(Math.random() * (max - min + 1)) + min;
}
