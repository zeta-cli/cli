#!/usr/bin/env node

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
const pkg = require('./../package.json');
const { parser } = require('../lib/shared/helpers/arguments.parser');

cli.setApp('zeta-cli', pkg.version);
cli.enable('timeout', 'version');
cli.parse(null, {
  task: 'Task management command'
  // 'task-ls-remote': 'List available remote tasks to install'
});

cli.main((args, opts) => {

// node bin/zeta-cli.js task --scopes-0-name MCA --scopes-0-paths 'path1,path2' --scopes-1-name MCA --scopes-1-paths 'path1,path2'
// node bin/zeta-cli.js task -J '{ "scopes": [ {"name":"MCA", "paths":["path1", "path2"]}, {"name":"MCA", "paths":["path1", "path2"]} ] }'

  // Parser arguments

  const options = parser(process.argv.splice(3, process.argv.length));

  const commands = options.commands;
  delete options.commands;

  const command = require(`./../lib/commands/${cli.command}`);
  command.execute(args, commands, options);
});
