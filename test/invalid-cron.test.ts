import { InvalidRangeError } from "../src/operations/range";
import { InvalidStepError } from "../src/operations/step";
import parser from "../src/parser";

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

  describe.each`
    expression       | problem
    ${"0/a * * * *"} | ${"is invalid"}
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
