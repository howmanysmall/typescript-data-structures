export default function* $range(start: number, finish: number, step = 1) {
	if (step > 0) for (let index = start; index <= finish; index += step) yield index;
	else for (let index = start; index >= finish; index += step) yield index;
}
