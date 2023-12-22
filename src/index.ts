import AleaRandom from "./algorithms/math/alea-random";
import LiveRandom from "./algorithms/math/live-random";
import $range from "./utilities/range";

export {};

{
	const gwag = 54_345_321;
	console.log(gwag >> 18);
}

{
	const gwag = BigInt(54_345_321);
	console.log(gwag >> 18n);
}

{
	const PCG32_INC = 105;
	const gwag = {
		state: BigInt(452_789_526),
	};

	function pcg32Random() {
		const previousState = gwag.state;
		gwag.state = previousState * 6_364_136_223_846_793_005n + (BigInt(PCG32_INC) | 1n);

		const xorShifted = Number((previousState >> 18n) ^ previousState) >> 27;
		const rot = Number(previousState >> 59n);

		return (xorShifted >> rot) | (xorShifted << (-rot & 31));
	}

	console.log(pcg32Random());
	console.log(gwag.state);
}

//const SEED_TO_USE = 62_017;
//const randomLibrary = new AleaRandom([SEED_TO_USE]);

//const nextInteger = randomLibrary.nextInteger.bind(randomLibrary);

//const liveRandom = new LiveRandom(1, 10, nextInteger);
//console.log(liveRandom.peek());
