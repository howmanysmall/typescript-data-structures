export function fastGcdUseTemporary(a: number, b: number) {
	while (b > 0) {
		const temporary = a;
		a = b;
		b = temporary % b;
	}

	return a;
}

export default function fastGcd(a: number, b: number) {
	while (b > 0) [a, b] = [b, a % b];
	return a;
}
