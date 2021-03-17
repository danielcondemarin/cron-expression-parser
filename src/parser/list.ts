const list = (expression: string) => {
  return expression.split(",").map(Number);
};

export default list;
