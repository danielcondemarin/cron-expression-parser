const step = (expression: string): number[] => {
  let result = [];
  const [, stepFactor] = expression.split("/");

  for (let i = 0; i <= 59; i += Number(stepFactor)) {
    result.push(i);
  }

  return result;
};

export default step;
