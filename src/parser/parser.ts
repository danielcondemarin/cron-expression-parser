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

export class MissingExpressionPartsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingExpressionPartsError";
  }
}

export type ParsedExpression = {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
  command: string;
};

const parsers = [list, step, range];

const parsePart = (part: string, timeUnit: TimeUnit) => {
  const asNumber = Number(part);
  if (!isNaN(asNumber)) {
    return [asNumber];
  }

  for (let parser of parsers) {
    if (parser.canParse(part)) {
      return parser.parse(part, timeUnit);
    }
  }
};

const parser = (expression: string): ParsedExpression => {
  const parts = expression.split(" ");

  if (parts.length < 6) {
    throw new MissingExpressionPartsError(
      "Cron expression has missing parts. See https://linux.die.net/man/5/crontab for reference"
    );
  }

  const [
    minuteStr,
    hourStr,
    dayOfMonthStr,
    monthStr,
    dayOfWeek,
    command,
  ] = parts;

  return {
    minute: parsePart(minuteStr, Minutes),
    hour: parsePart(hourStr, Hours),
    dayOfMonth: parsePart(dayOfMonthStr, DayOfMonth),
    month: parsePart(monthStr, Month),
    dayOfWeek: parsePart(dayOfWeek, DayOfWeek),
    command,
  };
};

export default parser;
