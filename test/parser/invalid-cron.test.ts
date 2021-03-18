import { InvalidRangeError } from "../../src/parser/operations/range";
import { InvalidStepError } from "../../src/parser/operations/step";
import parser from "../../src/parser";
import { MissingExpressionPartsError } from "../../src/parser/parser";

describe("Given I parse an invalid cron expression", () => {
  describe("When the expression is missing parts", () => {
    it("Then throws an InvalidExpressionError", () => {
      expect.assertions(1);

      try {
        parser("* * *");
      } catch (err) {
        expect(err).toBeInstanceOf(MissingExpressionPartsError);
      }
    });
  });

  describe.each`
    expression            | problem
    ${"0-90 * * * * cmd"} | ${"is out of bounds"}
    ${"* 0-60 * * * cmd"} | ${"is out of bounds"}
    ${"* * 0-10 * * cmd"} | ${"is out of bounds"}
    ${"* * * 0-13 * cmd"} | ${"is out of bounds"}
    ${"* a-b * * * cmd"}  | ${"has invalid values"}
    ${"* * a-b * * cmd"}  | ${"has invalid values"}
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

  describe.each`
    expression           | problem
    ${"0/a * * * * cmd"} | ${"is invalid"}
  `("When the step $problem", ({ expression }) => {
    it("Then the parser throws an InvalidStepError", () => {
      expect.assertions(1);

      try {
        parser(expression);
      } catch (err) {
        expect(err).toBeInstanceOf(InvalidStepError);
      }
    });
  });
});
