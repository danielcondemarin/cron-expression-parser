import { InvalidRangeError } from "../src/operations/range";
import parser from "../src/parser";

const sequence = (start: number, end: number): number[] => {
  let seq = [];
  for (let i = start; i <= end; i++) {
    seq.push(i);
  }

  return seq;
};

describe("Given I parse a valid cron expression", () => {
  describe.each`
    operator | expression          | expected
    ${","}   | ${"0,5,10 * * * *"} | ${[0, 5, 10]}
    ${"*/"}  | ${"*/15 * * * *"}   | ${[0, 15, 30, 45]}
    ${"-"}   | ${"0-10 * * * *"}   | ${sequence(0, 10)}
    ${"*"}   | ${"* * * * *"}      | ${sequence(0, 59)}
  `(
    "When the minute part uses the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it parses it successfully", () => {
        const parsed = parser(expression);
        expect(parsed.minute).toEqual(expected);
      });
    }
  );

  describe.each`
    operator | expression          | expected
    ${","}   | ${"* 0,5,10 * * *"} | ${[0, 5, 10]}
    ${"*/"}  | ${"* */10 * * *"}   | ${[0, 10, 20]}
    ${"-"}   | ${"* 0-10 * * *"}   | ${sequence(0, 10)}
    ${"*"}   | ${"* * * * *"}      | ${sequence(0, 23)}
  `(
    "When the hour part uses the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it parses it successfully", () => {
        const parsed = parser(expression);
        expect(parsed.hour).toEqual(expected);
      });
    }
  );
});

describe("Given I parse an invalid cron expression", () => {
  describe.each`
    expression
    ${"0-90 * * * *"}
    ${"* 0-60 * * *"}
  `("When the range is out of bounds", ({ expression }) => {
    it("Then the parser throws an InvalidRangeError", () => {
      expect.assertions(1);

      try {
        parser(expression);
      } catch (err) {
        expect(err).toBeInstanceOf(InvalidRangeError);
      }
    });
  });
});
