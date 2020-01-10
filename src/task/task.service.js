/* 
* This file is part of the Zeta distribution (https://github.com/hermosillaeveris/zeta-cli.git).
* Copyright (c) 2019 Zeta Team.
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

const taskService = {

  zcli: {
    prefix: 'ztk',
    module: 'zeta-cli',
    getPackageName(name) {
      return `@${taskService.zcli.module}/${taskService.zcli.prefix}-${name}`
    }
  },

  /**
   * Get task info from task name.
   * @param {string} taskName Task name
   * @returns {Object} Zeta task info
   */
  getTaskInfo(taskName) {
    let ztask = taskService._getZTaskInfo(taskName);
    if (!ztask) { 
      ztask = taskService._getTaskInfo(taskName);
    }

    return ztask;
  },


  _getZTaskInfo(taskName) {
    try {
      return require(taskService.zcli.getPackageName(taskName));
    } catch (err) { /* Not error */ }
  },

  _getTaskInfo(taskName) {
    try {
      return require(taskName);
    } catch (err) { /* Not error */ }
  }

};


module.exports = {
  getTaskInfo: taskService.getTaskInfo
};
