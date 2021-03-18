describe("Given I pass a cron expression to the cli", () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockReturnValue();
  });

  describe("When is valid", () => {
    beforeEach(() => {
      process.argv.push("*/15 0 1,15 * 1-5 /usr/bin/find");
      require("../bin/cli.ts");
    });

    it("prints correct output to stdout", () => {
      expect(logSpy).toBeCalledWith(`
minute       0 15 30 45
hour         0
day of month 1 15
month        1 2 3 4 5 6 7 8 9 10 11 12
day of week  1 2 3 4 5
command      /usr/bin/find
`);
    });
  });
});
