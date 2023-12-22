import type QueueLike from "../../types/queue-like";
import { isUndefined } from "../../utilities/undefined-utilities";

/**
 * A Stack is a LIFO (last in, first out) data structure.
 */
export class Stack<T> implements QueueLike<T> {
	/**
	 * The data in the stack.
	 */
	public readonly data = new Array<T>();

	/**
	 * The length of the stack.
	 */
	public length = 0;

	/**
	 * Pushes the passed value to the end of the stack.
	 *
	 * @throws {TypeError} if the passed value is undefined.
	 * @param value The value to push.
	 * @return The new length of the stack.
	 */
	public push(value: T) {
		if (isUndefined(value)) throw new TypeError("value is undefined");

		const length = this.length;
		this.data[length] = value;
		return (this.length = length + 1);
	}

	/**
	 * Pushes many values at once. Syntax sugar for calling push multiple times.
	 * @param values The values to push.
	 * @return The new length of the stack.
	 */
	public pushMany(...values: Array<T>) {
		for (const value of values) this.push(value);
		return this.length;
	}

	/**
	 * Peeks at the first value that'll be removed.
	 */
	public peek(): T | undefined {
		return this.data[this.length - 1];
	}

	/**
	 * Removes the last value from the stack.
	 * @return The removed value.
	 */
	public pop(): T | undefined {
		const { data, length } = this;

		if (length > 0) {
			const value = data[length - 1];
			delete data[length - 1];
			this.length = length - 1;
			return value;
		}

		return undefined;
	}

	/**
	 * Gets the top (last) value of the stack. Alias for {@linkcode peek}.
	 * @return The top value.
	 */
	public getTop(): T | undefined {
		return this.peek();
	}

	/**
	 * Gets the bottom (first) value of the stack.
	 * @return The bottom value.
	 */
	public getBottom(): T | undefined {
		return this.data[0];
	}

	/**
	 * Determines if the stack is empty.
	 * @return True if the stack is empty, false otherwise.
	 */
	public isEmpty() {
		return this.length === 0;
	}

	/**
	 * Converts the stack to a string.
	 * @return The string representation of the stack.
	 */
	public toString() {
		const stackStringArray = this.data.map(String);
		return `Stack<[${stackStringArray.join(", ")}]>`;
	}
}
