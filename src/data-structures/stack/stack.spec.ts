import { describe, expect, test } from "bun:test";
import { Stack } from ".";

describe("Stack", () => {
	test("constructor", () => {
		const stack = new Stack<number>();
		expect(stack instanceof Stack).toBe(true);
	});

	describe("Stack.push", () => {
		test("it should throw if the passed value is null", () => {
			expect(() => {
				const stack = new Stack<number>();
				stack.push(null as never);
			}).toThrow();
		});

		test("it should throw if the passed value is undefined", () => {
			expect(() => {
				const stack = new Stack<number>();
				stack.push(undefined as never);
			}).toThrow();
		});

		test("it should return the length", () => {
			const stack = new Stack<number>();
			expect(stack.push(1)).toBe(1);
			expect(stack.push(2)).toBe(2);
		});

		test("it should push to the end of the stack", () => {
			const stack = new Stack<number>();
			stack.push(1);
			// eslint-disable-next-line unicorn/no-array-push-push
			stack.push(2);
			expect(stack.data[stack.length - 1]).toBe(2);
		});
	});

	describe("Stack.pop", () => {
		test("it should return undefined if the stack is empty", () => {
			const stack = new Stack<number>();
			expect(stack.pop()).toBeUndefined();
		});

		test("it should remove the and return the last value", () => {
			const stack = new Stack<number>();
			stack.pushMany(1, 2, 3);

			expect(stack.data[0]).toBe(1);
			expect(stack.peek()).toBe(3);
			expect(stack.pop()).toBe(3);
		});
	});

	describe("Stack.getBottom", () => {
		test("it should return the first value", () => {
			const stack = new Stack<number>();
			stack.pushMany(1, 2);
			expect(stack.getBottom()).toBe(1);
		});
	});

	describe("Stack.peek", () => {
		test("it should return the last value", () => {
			const stack = new Stack<number>();
			stack.pushMany(1, 2);
			expect(stack.peek()).toBe(2);
		});
	});

	describe("Stack.isEmpty", () => {
		test("it should return true if the stack is empty", () => {
			const stack = new Stack<number>();
			expect(stack.isEmpty()).toBe(true);
		});

		test("it should return false if the stack is not empty", () => {
			const stack = new Stack<number>();
			stack.push(1);
			expect(stack.isEmpty()).toBe(false);
		});
	});
});
