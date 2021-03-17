import { Token } from "./tokens";

const step = (expression: string): number[] => {
  let result = [];
  const [, stepFactor] = expression.split(Token.Slash);

  for (let i = 0; i <= 59; i += Number(stepFactor)) {
    result.push(i);
  }

  return result;
};

export default step;
