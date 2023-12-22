// Source: https://github.com/coverslide/node-alea

import $range from "../../../utilities/range";
import twoPower from "../../../utilities/two-power";

const TWO_NEG_32 = twoPower(-32);
const TWO_POS_32 = twoPower(32);
const TWO_NEG_53 = twoPower(-53);

type State = [number, number, number, number];

function createMash() {
	let currentValue = 0xef_c8_24_9d;

	function mash(data: number | string) {
		const dataString = data.toString();
		for (const index of $range(0, dataString.length - 1)) {
			currentValue += dataString.codePointAt(index) ?? 0;

			let hash = 0.025_196_032_824_169_38 * currentValue;
			currentValue = hash >>> 0;
			hash -= currentValue;
			hash *= currentValue;
			currentValue = hash >>> 0;
			hash -= currentValue;
			currentValue += hash * TWO_POS_32;
		}

		return (currentValue >>> 0) * TWO_NEG_32;
	}

	return mash;
}

/**
 * Alea PRNG.
 */
export default class AleaRandom {
	public constructor(public readonly seeds: Array<number> = [Date.now()]) {
		if (seeds.length === 0) seeds = [Date.now()];

		let mash = createMash();
		this.s0 = mash(" ");
		this.s1 = mash(" ");
		this.s2 = mash(" ");

		for (const index of $range(0, seeds.length - 1)) {
			this.s0 -= mash(seeds[index]);
			if (this.s0 < 0) this.s0 += 1;

			this.s1 -= mash(seeds[index]);
			if (this.s1 < 0) this.s1 += 1;

			this.s2 -= mash(seeds[index]);
			if (this.s2 < 0) this.s2 += 1;
		}

		mash = undefined!;
	}

	public static fromState(state: State): AleaRandom {
		const alea = new AleaRandom();
		alea.importState(state);
		return alea;
	}

	public next(): number {
		const value = 2_091_639 * this.s0 + this.c * TWO_NEG_32;
		this.s0 = this.s1;
		this.s1 = this.s2;
		return (this.s2 = value - (this.c = Math.trunc(value)));
	}

	public nextUInt32(): number {
		return this.next() * TWO_POS_32;
	}

	public nextNumber(min = 0, max = 1): number {
		return this.next() * (max - min) + min;
	}

	public nextInteger(min: number, max: number): number {
		return Math.floor(this.next() * (max - min + 1)) + min;
	}

	public nextFloat53(): number {
		return this.next() + Math.trunc(this.next() * 0x20_00_00) * TWO_NEG_53;
	}

	public exportState(): State {
		return [this.s0, this.s1, this.s2, this.c];
	}

	public importState(state: State) {
		this.s0 = +state[0] || 0;
		this.s1 = +state[1] || 0;
		this.s2 = +state[2] || 0;
		this.c = +state[3] || 0;
	}

	private s0 = 0;
	private s1 = 0;
	private s2 = 0;
	private c = 1;
}
