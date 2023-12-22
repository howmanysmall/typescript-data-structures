import { describe, test } from "bun:test";
import LiveRandom from ".";
import AleaRandom from "../alea-random";

const randomLibrary = new AleaRandom([62_017.420_22]);
const nextInteger = randomLibrary.nextInteger.bind(randomLibrary);

describe("LiveRandom", () => {
	describe("LiveRandom.peek", () => {
		test.skip("it should return the correct value every time", () => {});
	});
});
