import { TimeUnit } from "../time-unit";
import { Token } from "./tokens";

export default {
  canParse: (expression: string) => {
    return expression.includes(Token.Slash);
  },
  parse: (expression: string, timeUnit: TimeUnit) => {
    let result = [];
    const [, stepFactorStr] = expression.split(Token.Slash);
    const stepFactor = Number(stepFactorStr);

    for (
      let i = timeUnit.lowerBound;
      i <= timeUnit.upperBound;
      i += stepFactor
    ) {
      result.push(i);
    }

    return result;
  },
};
