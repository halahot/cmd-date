#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { addDays, addMonths, subDays, subMonths } = require("date-fns");

yargs(hideBin(process.argv))
  .command(
    "current",
    "Текущая дата и время в формате ISO",
    (yargs) => {
      return yargs
        .option("year", {
          alias: "y",
          type: "boolean",
          description: "Текущий год",
        })
        .option("month", {
          alias: "M",
          type: "boolean",
          description: "Текущий месяц",
        })
        .option("date", {
          alias: "D",
          type: "boolean",
          description: "Дата в календарном месяце",
        });
    },
    (argv) => {
      const now = new Date();
      if (argv.year) {
        console.log(now.getFullYear());
      } else if (argv.month) {
        console.log(now.getMonth() + 1);
      } else if (argv.date) {
        console.log(now.getDate());
      } else {
        console.log(now.toISOString());
      }
    }
  )
  .command(
    "add",
    "Прибавляет к текущей дате в днях/месяцах",
    (yargs) => {
      return yargs
        .option("days", {
          alias: "d",
          type: "number",
          description: "Количество дней, которые нужно прибавить",
          requiresArg: true,
        })
        .option("months", {
          alias: "m",
          type: "number",
          description: "Количество месяцев, которые нужно прибавить",
          requiresArg: true,
        });
    },
    (argv) => {
      let date = new Date();
      if (argv.days) date = addDays(date, argv.days);
      if (argv.months) date = addMonths(date, argv.months);
      console.log(date.toISOString());
    }
  )
  .command(
    "sub",
    "Вычитает от текущей даты день/месяц",
    (yargs) => {
      return yargs
        .option("days", {
          alias: "d",
          type: "number",
          description: "Количество дней, которые нужно вычесть",
          requiresArg: true,
        })
        .option("months", {
          alias: "m",
          type: "number",
          description: "Количество месяцев, которые нужно вычесть",
          requiresArg: true,
        });
    },
    (argv) => {
      let date = new Date();
      if (argv.days) date = subDays(date, argv.days);
      if (argv.months) date = subMonths(date, argv.months);
      console.log(date.toISOString());
    }
  )
  .demandCommand(1, "You need to specify a command")
  .help()
  .alias("help", "h")
  .strict()
  .parse();
