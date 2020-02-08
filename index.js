const chalk = require('chalk');
const boxen = require('boxen');
const prompts = require('prompts');
const program = require('commander');
const cmd = require('node-cmd');
const unicons = require("unicons");
const update = require('./lib/update');
const { version,author } = require('./package.json');
const questions = require('./lib/questions');

// 检测更新
update.update();

const cliOptions = {
  title: 'SpeedCli',
  version,
  author
}

const cli_UI = boxen(
  `${cliOptions.title} v${cliOptions.version}`,
  {
    margin: 1,
    padding: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    float: 'left'
  }
);
console.log(chalk.magentaBright(cli_UI));

program
  .version(`v.${cliOptions.version}`)
  .option('-d, --debug', 'output extra debugging')
  .option('-i --info', 'output cli info')
  .option('create --create', 'create you project')
program.parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.info) {
  const info_ui = boxen(
    `${cliOptions.title} v${cliOptions.version}
by.Hook
    `,
    {
      margin: 1,
      padding: 1,
      borderStyle: 'double',
      borderColor: 'cyan',
      float: 'left'
    }
  );
  console.log(chalk.magentaBright(info_ui));
}
if (program.create) {
  const list_ui = boxen(
    `${cliOptions.title} v${cliOptions.version}
    -------
    OPTIONS↓
    ${chalk.green('1. React Project')}
    ${chalk.green('2. Express Project')}
    ${chalk.red('3. Exit')}
    `,
    {
      margin: 1,
      padding: 1,
      borderStyle: 'double',
      borderColor: 'cyan',
      float: 'left'
    }
  );
  console.log(list_ui);

  (async () => {
    const response = await prompts(questions);
    const { type, name } = response;
    if (type === 1 && name) {
      console.log(`\n ${unicons.gear} ${chalk.blue(`[REACT PROJECT] ${name}`)}`);
      (async () => {
        await cmd.run(`npx create-react-app ${name}`);
      })()
    } else if (type === 2 && name) {
      console.log(`\n ${unicons.gear} ${chalk.blue(`[EXPRESS PROJECT] ${name}`)}`);
      (async () => {
        await cmd.run(`npx express --no-view ${name}`);
      })()
    } else if (type === 3) {
      cmd.get('exit');
    }else {
      console.log(chalk.red(`${unicons.cross} 序号或项目名有错！`));
      cmd.get('exit');
    }
  })();
}