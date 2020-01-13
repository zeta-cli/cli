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
const cli = require('cli');
const debug = require('debug')('zeta');
const { log, logf, errorf } = require('@zeta-cli/z-log');

module.exports = {

  /**
   * Execute command "task run".
   * 
   * @param {Array} args Argument commands
   * @param {Array} options Options
   * @param {Array} allargs Complete arguments
   */
  execute(args, options, allargs) {
    const taskname = args[1];

    log(`Installing ${taskname} ... \n`);

    try {
      var child_process = require('child_process');

      // child_process.execSync('npm config set @zeta-cli https://npm.pkg.github.com/zeta-cli');
      child_process.execSync(`npm install @zeta-cli/ztk-${taskname}`, { stdio: [0, 1] });

      cli.spinner(logf(`Installed ${taskname} successfully.`), true);
    } catch (err) {
      cli.spinner(errorf(`Task ${taskname} not found. `), true);
      debug(err);
    }
  }
}