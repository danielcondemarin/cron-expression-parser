import { OperationParser } from "./operations";
import list from "./operations/list";
import range from "./operations/range";
import step from "./operations/step";
import { Hours, Minutes, TimeUnit } from "./time-unit";

type ParsedExpression = {
  minute: number[];
  hour: number[];
};

const parsers: OperationParser[] = [list, step, range];

const parsePart = (part: string, timeUnit: TimeUnit) => {
  for (let parser of parsers) {
    if (parser.canParse(part)) {
      return parser.parse(part, timeUnit);
    }
  }
};

const parser = (expression: string): ParsedExpression => {
  const [minuteStr, hourStr] = expression.split(" ");

  return {
    minute: parsePart(minuteStr, Minutes),
    hour: parsePart(hourStr, Hours),
  };
};

export default parser;
