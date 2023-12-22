import $range from "../../utilities/range";

const ALPHABET_SIZE = 26;

/**
 * Return the index of the given character in the English alphabet, counting from 0.
 * @param character A character in the English alphabet.
 * @returns The index of the given character in the English alphabet, counting from 0.
 */
function alphabetIndex(character: string) {
	if (character.length === 0) throw new Error("Expected a character, but a string of length 0 was given.");
	const value = character.toLowerCase().codePointAt(0)! - 97;
	return value;
}

/**
 * Return the length of the match of the substrings of {@linkcode value} beginning at
 * {@linkcode index0} and {@linkcode index1}.
 *
 * @param value The string to match.
 * @param index0 The index of the first character of the first substring.
 * @param index1 The index of the first character of the second substring.
 * @returns The length of the match of the substrings of {@linkcode value} beginning at
 */
function matchLength(value: string, index0: number, index1: number) {
	if (index0 === index1) return value.length - index0;

	let matchCount = 0;
	while (index0 < value.length && index1 < value.length && value[index0] === value[index1]) {
		matchCount += 1;
		index0 += 1;
		index1 += 1;
	}

	return matchCount;
}

function fundamentalPreprocess(value: string) {
	if (value.length === 0) return new Array<number>();
	if (value.length === 1) return [1];

	const array = new Array<number>(value.length).fill(0);
	array[0] = value.length;
	array[1] = matchLength(value, 0, 1);
	for (const index of $range(2, array[1])) array[index] = array[1] - index + 1;

	let lower = 0;
	let upper = 0;

	for (const index of $range(2 + array[1], value.length - 1))
		if (index <= upper) {
			const k = index - lower;
			const b = z[k];
			const a = upper - index + 1;

			if (b < a) array[index] = b;
			else {
				array[index] = a + matchLength(value, a, upper + 1);
				lower = index;
				upper = index + array[index] - 1;
			}
		} else {
			array[index] = matchLength(value, 0, index);
			if (array[index] > 0) {
				lower = index;
				upper = index + array[index] - 1;
			}
		}

	return array;
}

function badCharacterTable(value: string) {
	if (value.length === 0) return new Array<Array<number>>(ALPHABET_SIZE).fill(new Array<number>(0));

	const array = new Array<Array<number>>(ALPHABET_SIZE).fill([-1]);
	const alphabet = new Array<number>(ALPHABET_SIZE).fill(-1);

	for (const index of $range(0, value.length - 1)) {
		const character = value[index];
		alphabet[alphabetIndex(character)] = index;

		let jndex = 0;
		for (const localValue of alphabet) array[jndex++].push(localValue);
	}

	return array;
}

export default function boyerMoore() {}
