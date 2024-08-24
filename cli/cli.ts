import { Crawler } from "./utils/crawler/crawler";
import { CrawlerInterface } from "./utils/crawler/crawler.interface";
import chalk from "chalk";
import { Command } from "commander";
import { JsonManager } from "./utils/json/json.manager";
import path from "path";

const filePath = path.join(__dirname, "./dicts/structures.json");
const jsonManager = new JsonManager(filePath);
const program = new Command();

const action: CrawlerInterface = new Crawler(
  require("./dicts/structures.json")
);

program.name("cli").version("0.0.1").description("CLI app");

program
  .command("analyze")
  .description("analyze a phrase")
  .argument("<phrase>", "phrase")
  .requiredOption("-d, --depth <number>", "depth")
  .option("-v, --verbose", "verbose")
  .action((phrase: string, options: any) => {
    const properties = action.analyzed(phrase, options.depth);

    if (options.verbose) {
      console.log(
        "Tempo de verfificação dos parâmetros: " +
          chalk.yellow(Number(action.getLoadParamsProcessing()).toFixed(2)) +
          " ms"
      );

      console.log(
        "Tempo de verficação da frase: " +
          chalk.yellow(Number(action.getLoadPhraseProcessing()).toFixed(2)) +
          " ms"
      );

      properties.forEach((property) => {
        console.log(
          `${chalk.whiteBright(property.name)} = ${chalk.blue(property.qty)};`
        );
      });
      return;
    }

    properties.forEach((property) => {
      console.log(
        `${chalk.whiteBright(property.name)} = ${chalk.blue(property.qty)};`
      );
    });
  });

program
  .command("add")
  .description("add an object to an array in a JSON file")
  .option("-n, --name <string>", "name")
  .option("-p, --parent <string>", "parent")
  .option("-nd,--node <number>", "node")
  .action((options) => {
    jsonManager
      .insert({
        name: options.name,
        parent: options.parent,
        node: options.node,
      })
      .then((res) => console.log(chalk.green(res)));
  });

program.parse();
