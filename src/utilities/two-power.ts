import memoize from "./memoize";
import $range from "./range";

const twoPower = memoize((index: number) => 2 ** index);
export default twoPower;

for (const index of $range(-53, 53)) twoPower(index);
