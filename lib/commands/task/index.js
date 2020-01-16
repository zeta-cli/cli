/*
 * This file is part of the zeta-cli distribution (https://github.com/zeta-cli/cli.git).
 * Copyright (c) 2019 Antonio Hermosilla.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
const { log, logf, error, errorf } = require('@zeta-cli/z-log');
const cliHelper = require('../../shared/helpers/cli.helper');

module.exports = {

  taskCommands: {
    'help': 'Show this help',
    'install': 'Install a new task from the remote',
    // 'ls': 'List all task',
    'ls-remote': 'List available task from remote',
    'run': 'Run task'
  },

  /**
   * Execute command task.
   *
   * @param {Array} args Argument commands
   * @param {Array} commands Commands
   * @param {Object} options Options
   */
  execute(args, commands, options) {
    const command = commands ? commands.shift() : null;

    if (!command || command === 'help' || !this.taskCommands[command]) {
      cliHelper.showCommands('task', this.taskCommands);
    } else {
      const commandController = require(`./task-${command}.command`);
      commandController.execute(args, commands, options);
    }
  }

};
