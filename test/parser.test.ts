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
    "When the hour contains the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it parses it successfully", () => {
        const parsed = parser(expression);
        expect(parsed.hour).toEqual(expected);
      });
    }
  );

  describe.each`
    operator | expression          | expected
    ${","}   | ${"* * 1,5,10 * *"} | ${[1, 5, 10]}
    ${"*/"}  | ${"* * */15 * *"}   | ${[1, 16, 31]}
    ${"-"}   | ${"* * 1-10 * *"}   | ${sequence(1, 10)}
    ${"*"}   | ${"* * * * *"}      | ${sequence(1, 31)}
  `(
    "When the day of the month contains the operator '$operator'",
    ({ expression, expected }) => {
      it("Then it parses it successfully", () => {
        const parsed = parser(expression);
        expect(parsed.dayOfMonth).toEqual(expected);
      });
    }
  );
});

describe("Given I parse an invalid cron expression", () => {
  describe.each`
    expression        | problem
    ${"0-90 * * * *"} | ${"is out of bounds"}
    ${"* 0-60 * * *"} | ${"is out of bounds"}
    ${"* * 0-10 * *"} | ${"is out of bounds"}
    ${"* a-b * * *"}  | ${"has invalid values"}
    ${"* * a-b * *"}  | ${"has invalid values"}
  `("When the range $problem", ({ expression }) => {
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
