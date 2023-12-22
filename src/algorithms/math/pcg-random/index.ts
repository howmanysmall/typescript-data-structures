const PCG32_INC = 105;

export default class Pcg32Random {
	private state!: bigint;

	private pcg32Random() {
		const previousState = this.state;
		this.state = previousState * 6_364_136_223_846_793_005n + (BigInt(PCG32_INC) | 1n);

		const xorShifted = Number(((previousState >> 18n) ^ previousState) >> 27n);
		const rot = Number(previousState >> 59n);

		return (xorShifted >> rot) | (xorShifted << (-rot & 31));
	}
}

const gwag = {
	state: BigInt(452_789_526),
};

function pcg32Random() {
	const previousState = gwag.state;
	gwag.state = previousState * 6_364_136_223_846_793_005n + (BigInt(PCG32_INC) | 1n);

	const xorShifted = Number(((previousState >> 18n) ^ previousState) >> 27n);
	const rot = Number(previousState >> 59n);

	return (xorShifted >> rot) | (xorShifted << (-rot & 31));
}
