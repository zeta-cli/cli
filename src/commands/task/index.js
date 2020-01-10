/* 
 * This file is part of the zeta-cli distribution (https://github.com/hermosillaeveris/zeta-cli).
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
const { log, logf, error, errorf } =  require('@zeta-cli/z-log');

module.exports = {

  taskCommands: ['help', 'install', 'list', 'run'],

  /**
   * Execute command task.
   * 
   * @param {Array} args Argument commands
   * @param {Array} options Options
   * @param {Array} allargs Complete arguments
   */
  execute(args, options, allargs) {
    const command = args[0];

    log('');
    if (!command || this.taskCommands.indexOf(command) === -1) {
      console.log('show help');
    } else {
      const commandController = require(`./task-${command}.command`);
      commandController.execute(args, options, allargs);
    }

  }

};