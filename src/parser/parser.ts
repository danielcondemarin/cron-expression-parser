import list from "./operations/list";
import range from "./operations/range";
import step from "./operations/step";
import {
  DayOfMonth,
  DayOfWeek,
  Hours,
  Minutes,
  Month,
  TimeUnit,
} from "./time-unit";

export interface OperationParser {
  canParse: (expression: string) => boolean;
  parse: (expression: string, timeUnit: TimeUnit) => number[];
}

type ParsedExpression = {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
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
  const [
    minuteStr,
    hourStr,
    dayOfMonthStr,
    monthStr,
    dayOfWeek,
  ] = expression.split(" ");

  return {
    minute: parsePart(minuteStr, Minutes),
    hour: parsePart(hourStr, Hours),
    dayOfMonth: parsePart(dayOfMonthStr, DayOfMonth),
    month: parsePart(monthStr, Month),
    dayOfWeek: parsePart(dayOfWeek, DayOfWeek),
  };
};

export default parser;
