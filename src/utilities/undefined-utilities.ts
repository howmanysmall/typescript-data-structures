/**
 * Checks if the value is undefined (null is treated as undefined).
 */
export function isUndefined<T>(value?: T): value is undefined {
	return value === undefined || value === null;
}

/**
 * Converts null to undefined.
 */
export function toUndefined<T>(value?: T) {
	return value === null ? undefined : value;
}
