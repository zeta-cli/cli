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
const set = require('lodash/set');
const get = require('lodash/get');

const parsers = {
  json(arg, status) {
    try {
      return JSON.parse(arg);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Parse param
   *
   * @param {string} arg Argument
   * @param {{parser: Object, option: string, value: string}} status Status
   * @param {Object} obj Current object
   * @returns {Object} Result object
   */
  param(arg, status, obj) {
    parsers._updateStatusFromArgument(arg, status);    // Complete status object

    if (status.value) {
      parsers._addParam(obj, status);
    }

    return obj;
  },

  /**
   * Update status from argument
   * @param {string} arg Argument
   * @param {Object} status Status object
   */
  _updateStatusFromArgument(arg, status) {
    if (arg.startsWith('--')) {
      status.argument = arg;
      status.path = arg.replace(/^--/, '').replace(/-/g, '.');
      const path = status.path.split('.');
      status.option = path.pop();
      status.parent = path;
      status.value = undefined;
    } else {
      status.value = arg;
    }
  },

  _addParam(obj, status) {
    if (status.value.indexOf(',') !== -1) {
      status.value = status.value.split(',');
    }
    if (!status.path) { status.path = 'commands'; }
    if (status.path === 'commands') {
      const data = get(obj, status.path);
      if (data && Array.isArray(data)) {
        data.push(status.value);
        status.value = data;
      } else {
        status.value = [ status.value ];
      }
    }

    set(obj, status.path, status.value);
  }
};

const argumentParser = {

  /**
   * Parse arguments from argument list
   *
   * @param {Array} args Arguments list
   * @returns {Object} Parsed arguments
   */
  parser(args) {
    const status = { parser: undefined, option: undefined, value: undefined };
    let result = {};
    let cParser = parsers.param;

    // console.log(args);
    if (args && Array.isArray(args)) {
      args.forEach((arg) => {
        if (argumentParser.optionParser[arg]) {
          status.parser = arg;
          cParser = argumentParser.optionParser[arg];
        } else {
          result = result ? Object.assign(result, cParser(arg, status, result)) : cParser(arg, status, result);
        }
      });
    }
    // console.log(result);
    return result;
  },

  optionParser: {
    '-J': parsers.json,
    '-L': parsers.param
  }
};


module.exports = {
  parser: argumentParser.parser
};
