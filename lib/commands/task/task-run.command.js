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
const cli = require('cli');
const debug = require('debug')('zeta');
var Ajv = require('ajv');
const zetaService = require('../../shared/services/zeta.service');
const { log, logf, error, errorf } = require('@zeta-cli/z-log');

module.exports = {

  /**
   * Execute command "task run". 
   * 
   * @param {Array} args Argument commands
   * @param {Array} commands Task info
   * @param {Object} options Options
   */
  async execute(args, commands, options) {

    const task = this._getZetaTaskFromCommands(commands);
    if (!task) { error(`Invalid task! You must provide a task to execute. `); return; }

    const taskinfo = zetaService.getTaskInfo(task.package);
    if (!taskinfo) { error(`Invalid task! Package '${task.package}' not found. `); return; }

    log(`Running task '${task.name}' in '${task.package}' package ... `);
    log('');

    const taskToRun = taskinfo[task.name];
    const jsonSchema = this._getJSONSchemaFromTaskInfo(taskinfo, task.name);

    if (!taskToRun || typeof taskToRun !== 'function') {
      error(`Task '${task.name}' not exist in '${task.package}' package. `);
      // if (taskinfo.info && taskinfo.info.doc) { console.log(taskinfo.info.doc); }
      return;
    }

    if (!jsonSchema || this._isValidJSONSchema(jsonSchema, options)) {
      await taskToRun({}, options);
    }

    log('');
    log(`Task '${task.name}' finished.`);
  },

  _getZetaTaskFromCommands(commands) {
    let task = commands && Array.isArray(commands) ? commands.shift() : null;
    if (task) {
      if (task.indexOf('.') !== -1) {
        task = { package: task.split('.')[0], name: task.split('.')[1] }
      } else {
        task = { package: task, name: 'default' }
      }
    }
    return task;
  },

  /**
   * Get JSON Schema from task info
   * 
   * @param {Object} taskinfo Task info
   * @param {string} taskname Task name
   * @returns {Object} JSON schema to task
   */
  _getJSONSchemaFromTaskInfo(taskinfo, taskname) {
    if (taskinfo && taskinfo.info && taskinfo.info.tasks && taskinfo.info.tasks[taskname] && taskinfo.info.tasks[taskname].params) {
      return taskinfo.info.tasks[taskname].params;
    }
  },

  _isValidJSONSchema(jsonSchema, options) {
    const ajv = new Ajv();
    const valid = ajv.validate(jsonSchema, options);
    if (!valid) {
      error(ajv.errorsText());
      log(jsonSchema);
      return false
    }
    return true;
  }
};
