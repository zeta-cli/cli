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
const https = require('https');
const padEnd = require('lodash/padEnd');
const { log, error } = require('@zeta-cli/z-log');

module.exports = {

  urlTasks: 'https://raw.githubusercontent.com/zeta-cli/tasks/master/ztk-list.json',

  /**
   * Execute command "task run".
   * 
   * @param {Array} args Argument commands
   * @param {Array} options Options
   * @param {Array} allargs Complete arguments
   */
  async execute(args, options, allargs) {
    log('Remote tasks:');
    const tasks = await this.getRemoteTaskList();
    if (tasks && Array.isArray(tasks)) {
      tasks.forEach(t => { log(`  - ${padEnd(t.name, 25)}  ${padEnd(t.version, 10)} ${t.description} `) })
    }
    return tasks;
  },

  /**
   * Get Task list from remote.
   * @return {Promise} Promise with task list
   */
  getRemoteTaskList() {
    return new Promise(resolve => {
      https.get(this.urlTasks, (res) => {
        let body = "";
        res.on("data", chunk => { body += chunk; });
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            error(err.message);
          };
        });
      });
    });
  }
}