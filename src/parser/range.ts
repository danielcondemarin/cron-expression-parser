import { Token } from "./tokens";

const range = (expression: string): number[] => {
  if (expression === Token.Asterisk) {
    let firstToLast = [];

    for (let i = 0; i <= 59; i++) {
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
};

export default range;
