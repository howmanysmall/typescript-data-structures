import { describe, expect, test } from "bun:test";
import sleepSort from "./sleep-sort";

describe("sleepSort", () => {
	test("it should sort the array", async () => {
		const array = [4, 5, 2, 1, 3];
		const sortedArray = await sleepSort(array);
		expect(sortedArray).toEqual([1, 2, 3, 4, 5]);
	});
});
