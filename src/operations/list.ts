import { Token } from "./tokens";

export default {
  parse: (expression: string) => {
    return expression.split(Token.Comma).map(Number);
  },
  canParse: (expression: string) => {
    return expression.includes(Token.Comma);
  },
};
