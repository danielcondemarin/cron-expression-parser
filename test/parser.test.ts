import parser from "../src/parser";

const sequence = (start: number, end: number): number[] => {
  let seq = [];
  for (let i = start; i <= end; i++) {
    seq.push(i);
  }

  return seq;
};

describe("Parser", () => {
  describe("Given I have a valid cron expression", () => {
    describe.each`
      operator | expression          | expected
      ${","}   | ${"0,5,10 * * * *"} | ${[0, 5, 10]}
      ${"*/"}  | ${"*/15 * * * *"}   | ${[0, 15, 30, 45]}
      ${"-"}   | ${"0-10 * * * *"}   | ${sequence(0, 10)}
      ${"*"}   | ${"* * * * *"}      | ${sequence(0, 59)}
    `(
      "When the minute uses the operator '$operator'",
      ({ expression, expected }) => {
        it("parses it successfully", () => {
          const parsed = parser(expression);
          expect(parsed.minute).toEqual(expected);
        });
      }
    );
  });
});
