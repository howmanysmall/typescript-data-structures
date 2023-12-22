type Memoize<T, V> = (index: T) => V;

/**
 * Used to memoize a function. It keeps the results of the function in a cache.
 * @param callback The function to memoize.
 * @returns The memoized function.
 */
export default function memoize<T, V>(callback: Memoize<T, V>): Memoize<T, V> {
	const cache = new Map<T, V>();

	function cacheFunction(index: T): V {
		const currentValue = cache.get(index);
		if (currentValue !== undefined) return currentValue;

		const newValue = callback(index);
		cache.set(index, newValue);
		return newValue;
	}

	return cacheFunction;
}
