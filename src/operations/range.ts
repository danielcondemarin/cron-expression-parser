import { TimeUnit } from "../time-unit";
import { Token } from "./tokens";

export default {
  canParse: (expression: string) => {
    return (
      expression.includes(Token.Dash) || expression.includes(Token.Asterisk)
    );
  },
  parse: (expression: string, timeUnit: TimeUnit) => {
    if (expression === Token.Asterisk) {
      let firstToLast = [];

      for (let i = timeUnit.lowerBound; i <= timeUnit.upperBound; i++) {
        firstToLast.push(i);
      }

      return firstToLast;
    }

    let range = [];
    const [start, end] = expression.split(Token.Dash).map(Number);

    for (let m = start; m <= end; m++) {
      range.push(m);
    }

    return range;
  },
};
