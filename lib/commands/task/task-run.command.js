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
const workspace = require('../../workspace');
const cli = require('cli');
const debug = require('debug')('zeta');
const { log, logf, error, errorf } = require('@zeta-cli/z-log');

module.exports = {

  /**
   * Execute command "task run". 
   * 
   * @param {Array} args Argument commands
   * @param {Array} options Options
   * @param {Array} allargs Complete arguments
   */
  async execute(args, options, allargs) {
    const taskname = args[1];

    log(`Running task ${taskname} `);

    const task = workspace.getTaskByName(taskname);


    // if (typeof task === 'function' || typeof task === 'object') {

    //   try {
    //     cli.spinner(` Waiting to finish ${taskname} ... `);
    //     const result = await task.default();
    //     cli.spinner(logf(`Task ${taskname} finished successfully. `), true);

    //   } catch (err) {
    //     cli.spinner(errorf(`Task ${taskname} invalid or not exist.`), true);
    //     debug(err);
    //   }
    // } else {
    //   error(`Task ${taskname} not found`);
    // }
  }
};
