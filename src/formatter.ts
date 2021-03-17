import { ParsedExpression } from "./parser/parser";

interface Formatter {
  format: (parsedExpression: ParsedExpression) => string;
}

const join = (arr: any[]) => {
  return arr.join(" ");
};

export const tableFormatter: Formatter = {
  format: (parsedExpression: ParsedExpression) => {
    return `
minute       ${join(parsedExpression.minute)}
hour         ${join(parsedExpression.hour)}
day of month ${join(parsedExpression.dayOfMonth)}
month        ${join(parsedExpression.month)}
day of week  ${join(parsedExpression.dayOfWeek)}
command      ${parsedExpression.command}
`;
  },
};
