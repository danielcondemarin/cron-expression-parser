import { TimeUnit } from "../time-unit";
import { Token } from "./tokens";

export default {
  canParse: (expression: string) => {
    return expression.includes(Token.Slash);
  },
  parse: (expression: string, timeUnit: TimeUnit) => {
    let result = [];
    const [, stepFactor] = expression.split(Token.Slash);

    for (
      let i = timeUnit.lowerBound;
      i <= timeUnit.upperBound;
      i += Number(stepFactor)
    ) {
      result.push(i);
    }

    return result;
  },
};
