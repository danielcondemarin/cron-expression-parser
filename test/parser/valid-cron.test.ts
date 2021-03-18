import parser from "../../src/parser";

const sequence = (start: number, end: number): number[] => {
  let seq = [];
  for (let i = start; i <= end; i++) {
    seq.push(i);
  }

  return seq;
};

describe("Given I parse a valid cron expression", () => {
  describe("When the expression has simple values", () => {
    it("Then it parsed successfully", () => {
      const parsedExpression = parser("0 0 1 1 0 cmd");
      expect(parsedExpression).toEqual({
        minute: [0],
        hour: [0],
        dayOfMonth: [1],
        month: [1],
        dayOfWeek: [0],
        command: "cmd",
      });
    });
  });

  describe.each`
    operator | expression              | expected
    ${","}   | ${"0,5,10 * * * * cmd"} | ${[0, 5, 10]}
    ${"*/"}  | ${"*/15 * * * * cmd"}   | ${[0, 15, 30, 45]}
    ${"-"}   | ${"0-10 * * * * cmd"}   | ${sequence(0, 10)}
    ${"*"}   | ${"* * * * * cmd"}      | ${sequence(0, 59)}
  `(
    "When the minute part uses the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it is parsed successfully", () => {
        const parsed = parser(expression);
        expect(parsed.minute).toEqual(expected);
      });
    }
  );

  describe.each`
    operator | expression              | expected
    ${","}   | ${"* 0,5,10 * * * cmd"} | ${[0, 5, 10]}
    ${"*/"}  | ${"* */10 * * * cmd"}   | ${[0, 10, 20]}
    ${"-"}   | ${"* 0-10 * * * cmd"}   | ${sequence(0, 10)}
    ${"*"}   | ${"* * * * * cmd"}      | ${sequence(0, 23)}
  `(
    "When the hour contains the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it is parsed successfully", () => {
        const parsed = parser(expression);
        expect(parsed.hour).toEqual(expected);
      });
    }
  );

  describe.each`
    operator | expression              | expected
    ${","}   | ${"* * 1,5,10 * * cmd"} | ${[1, 5, 10]}
    ${"*/"}  | ${"* * */15 * * cmd"}   | ${[1, 16, 31]}
    ${"-"}   | ${"* * 1-10 * * cmd"}   | ${sequence(1, 10)}
    ${"*"}   | ${"* * * * * cmd"}      | ${sequence(1, 31)}
  `(
    "When the day of the month contains the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it parses it successfully", () => {
        const parsed = parser(expression);
        expect(parsed.dayOfMonth).toEqual(expected);
      });
    }
  );

  describe.each`
    operator | expression              | expected
    ${","}   | ${"* * * 1,5,10 * cmd"} | ${[1, 5, 10]}
    ${"*/"}  | ${"* * * */10 * cmd"}   | ${[1, 11]}
    ${"-"}   | ${"* * * 1-10 * cmd"}   | ${sequence(1, 10)}
    ${"*"}   | ${"* * * * * cmd"}      | ${sequence(1, 12)}
  `(
    "When the month contains the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it parses it successfully", () => {
        const parsed = parser(expression);
        expect(parsed.month).toEqual(expected);
      });
    }
  );

  describe.each`
    operator | expression           | expected
    ${","}   | ${"* * * * 1,2 cmd"} | ${[1, 2]}
    ${"*/"}  | ${"* * * * */7 cmd"} | ${[0, 7]}
    ${"-"}   | ${"* * * * 1-5 cmd"} | ${sequence(1, 5)}
    ${"*"}   | ${"* * * * * cmd"}   | ${sequence(0, 7)}
  `(
    "When the day of the week contains the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it parses it successfully", () => {
        const parsed = parser(expression);
        expect(parsed.dayOfWeek).toEqual(expected);
      });
    }
  );
});
