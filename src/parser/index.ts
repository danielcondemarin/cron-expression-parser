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

  let minute = [];

  if (expression.includes(",")) {
    minute = list(minuteStr);
  } else if (expression.includes("*/")) {
    minute = step(minuteStr);
  } else if (expression.includes("-") || expression.includes("*")) {
    minute = range(minuteStr);
  }

  return {
    minute,
  };
};

export default parser;
