import { Token } from "./tokens";

const list = (expression: string) => {
  return expression.split(Token.Comma).map(Number);
};

export default list;
