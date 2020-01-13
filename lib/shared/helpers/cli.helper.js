const padEnd = require('lodash/padEnd');


module.exports = {
  showCommands(command, commands) {
    console.log(`Usage:`);
    console.log(`  zeta-cli ${command} [ARGS]:\n`);
    console.log(`Arguments to '${command}':`);
    Object.keys(commands).map(k => {
      console.log(`  ${padEnd(k, 23, ' ')}${commands[k]}`)
    });
  }
};