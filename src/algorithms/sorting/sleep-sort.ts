import promiseDelay from "../../utilities/promise-delay";

/**
 * Horrendous sorting algorithm. It uses your CPU scheduler to sort your array. Might not even be guaranteed to work for non-ints.
 * @param array The array to sort
 * @returns A promise that resolves to the sorted array
 */
export default function sleepSort(array: Array<number>) {
	const sortedArray = new Array<number>(array.length);
	let length = 0;

	const promises = array.map((value) =>
		promiseDelay(value).then(() => {
			sortedArray[length++] = value;
			return true;
		}),
	);

	return Promise.all(promises).then(() => sortedArray);
}
