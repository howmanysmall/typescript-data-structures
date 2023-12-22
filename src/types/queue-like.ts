export default interface QueueLike<T> {
	readonly data: Array<T>;
	length: number;

	push(value: T): number;
	pushMany(...values: Array<T>): number;
	pop(): T | undefined;

	peek(): T | undefined;
	isEmpty(): boolean;

	toString(): string;
}
