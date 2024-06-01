import morgan from "morgan";
import chalk from "chalk";

export const logger = () => {
  return morgan.token("message", (req, res) => {
    const method = chalk.bold(req.method);
    const url = chalk.bold(req.url);
    const status = chalk.bold(res.statusCode.toString());
    const message = `${method} ${url} ${status}`;
    return message;
  });
};
