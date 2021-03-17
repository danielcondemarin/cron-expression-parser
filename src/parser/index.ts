//  possible operations
//  * (start to end)
//
//  1,2,3,... (list of numbers)
//  1-2,3-4,... (list of ranges)
//  1-2,*/2,3-4/3... (list of ranges with step value)
//
//  */2 (step over start to end)
//  0-10/2 (step over range)

import list from "./list";
import range from "./range";
import step from "./step";

type ParsedExpression = {
  minute: number[];
};

const parser = (expression: string): ParsedExpression => {
  const [minuteStr] = expression.split(" ");
  const parsers = [list, range, step];

  let minute = [];

  for (let { canParse, parse } of parsers) {
    if (canParse(minuteStr)) {
      minute = parse(minuteStr);
    }
  }

  return {
    minute,
  };
};

export default parser;
