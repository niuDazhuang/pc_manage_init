const path = require('path')
const shell = require('shelljs')
const co = require('co')
const chalk = require('chalk')
const prompt = require('co-prompt')
const genPages = require('../task/pages')
const genConfig = require('../task/config')
const genRouter = require('../task/router')

module.exports = () => {
  co(function *() {
    const ok = yield prompt.confirm(chalk.red.bold('=> 将会清空src?(yes/no)'))
    process.stdin.pause()
    if (ok) {
      shell.rm('-rf', './src')
      shell.cp('-R', path.join(__dirname, '..', 'template', 'src'), '.')

      genPages()
      genConfig()
      genRouter()
      shell.rm('-')
    } else {
      process.exit()
    }
  })
}
