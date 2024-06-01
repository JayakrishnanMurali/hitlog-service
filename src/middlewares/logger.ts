import morgan from "morgan";
import chalk from "chalk";

export const logger = morgan((tokens, req, res) => {
  return [
    // date time in the format [2017-11-02T11:13:54.545]
    chalk.gray(tokens.date(req, res)),
    chalk.green.bold(tokens.method(req, res)),
    chalk.red.bold(tokens.status(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.yellow(tokens["response-time"](req, res) + " ms"),
  ].join(" ");
});
