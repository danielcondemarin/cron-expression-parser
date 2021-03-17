import { Token } from "./tokens";

export default {
  canParse: (expression: string) => {
    return expression.includes(Token.Slash);
  },
  parse: (expression: string) => {
    let result = [];
    const [, stepFactor] = expression.split(Token.Slash);

    for (let i = 0; i <= 59; i += Number(stepFactor)) {
      result.push(i);
    }

    return result;
  },
};
