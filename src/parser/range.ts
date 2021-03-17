import { Token } from "./tokens";

export default {
  canParse: (expression: string) => {
    return (
      expression.includes(Token.Dash) || expression.includes(Token.Asterisk)
    );
  },
  parse: (expression: string) => {
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
  },
};
