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

const debug = require('debug')('zeta:workspace');

/** @typedef {workspace} workspace */
const workspace = {

  workspacePath: `${process.cwd()}/.workspace`,
  tasksFolder: 'tasks',

  /**
   * Get task by name
   * @param {string} taskName Task name
   */
  getTaskByName(taskName) {
    try {
      return require(`${workspace.workspacePath}/${workspace.tasksFolder}/${taskName}`)
    } catch (err) {
      debug(err);
      return null;
    }
  }
};


module.exports = {
  getTaskByName: workspace.getTaskByName
};