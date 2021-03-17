import { TimeUnit } from "../time-unit";
import { Token } from "./tokens";

export class InvalidRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRangeError";
  }
}

export default {
  canParse: (expression: string) => {
    return (
      expression.includes(Token.Dash) || expression.includes(Token.Asterisk)
    );
  },
  parse: (expression: string, timeUnit: TimeUnit) => {
    let start: number;
    let end: number;

    if (expression === Token.Asterisk) {
      start = timeUnit.lowerBound;
      end = timeUnit.upperBound;
    } else {
      [start, end] = expression.split(Token.Dash).map(Number);
    }

    if (start < timeUnit.lowerBound || end > timeUnit.upperBound) {
      throw new InvalidRangeError(`Invalid range bounds: ${expression}`);
    }

    let range = [];
    for (let m = start; m <= end; m++) {
      range.push(m);
    }

    return range;
  },
};
