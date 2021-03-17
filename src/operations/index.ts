import { TimeUnit } from "../time-unit";

export interface OperationParser {
  canParse: (expression: string) => boolean;
  parse: (expression: string, timeUnit: TimeUnit) => number[];
}
