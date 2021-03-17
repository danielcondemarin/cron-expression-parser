import { TimeUnit } from "../time-unit";
import { Token } from "./tokens";

export class InvalidStepError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidStepError";
  }
}

export default {
  canParse: (expression: string) => {
    return expression.includes(Token.Slash);
  },
  parse: (expression: string, timeUnit: TimeUnit) => {
    let result = [];
    const [, stepFactorStr] = expression.split(Token.Slash);
    const step = Number(stepFactorStr);

    if (isNaN(step)) {
      throw new InvalidStepError(`Invalid step found in ${expression}`);
    }

    for (let i = timeUnit.lowerBound; i <= timeUnit.upperBound; i += step) {
      result.push(i);
    }

    return result;
  },
};
