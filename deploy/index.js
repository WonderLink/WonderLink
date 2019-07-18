const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const server = require('./products');
const spinner = ora('正在发布到' + (process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器...');
spinner.start();
scpClient.scp(
  'dist/',
  {
    host: "213.59.119.5",
    port: "55555",
    username: "root",
    password: "hy15vps",
    path: "/usr/share/nginx/html"
  },
  function (err) {
    spinner.stop();
    if (err) {
      console.log(chalk.red('发布失败.\n'));
      throw err;
    } else {
      console.log(chalk.green('Success! 成功发布到' + (process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器! \n'));
    }
  }
);