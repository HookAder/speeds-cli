const chalk = require('chalk');
const boxen = require('boxen');
const prompts = require('prompts');
const program = require('commander');
const cmd = require('node-cmd');

const cliOptions = {
  title: 'SpeedCli',
  version: '1.0.0',
  author: 'Hook'
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
console.log(cli_UI);

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
by.${cliOptions.author}
    `,
    {
      margin: 1,
      padding: 1,
      borderStyle: 'double',
      borderColor: 'cyan',
      float: 'left'
    }
  );
  console.log(info_ui);
}
if (program.create) {
  const list_ui = boxen(
    `${cliOptions.title} v${cliOptions.version}
    -------
    OPTIONS↓
    1. React Project
    2. Express Project
    3. Exit
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
  const questions = [
    {
      type: 'number',
      name: 'type',
      message: '请选择序号'
    },
    {
      type: 'text',
      name: 'name',
      message: '项目名'
    }
  ];

  (async () => {
    const response = await prompts(questions);
    const { type, name } = response;
    if (type === 1) {
      console.log(`\n create-react-app ${name}`);
      (async () => {
        await cmd.run(`npx create-react-app ${name}`);
      })()
    } else if (type === 2) {
      console.log(`\n express-no-view ${name}`);
      (async () => {
        await cmd.run(`npx express --no-view ${name}`);
      })()
    } else if (type === 3) {
      cmd.get('exit');
    }else {
      console.log('输入序号有误!');
      cmd.get('exit');
    }
  })();
}