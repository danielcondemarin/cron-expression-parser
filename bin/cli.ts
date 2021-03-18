import parser from "../src/parser";
import { tableFormatter } from "../src/formatter";

const parsedExpression = parser(process.argv[2]);
const formatted = tableFormatter.format(parsedExpression);

console.log(formatted);
