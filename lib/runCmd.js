'use strict';

const getRunCmdEnv = require('./utils/getRunCmdEnv');

// fixed windows os issues "spawn npm ENOENT"
function compatibleWinEnv(cmd) {
  const isWin = /^win/.test(process.platform);

  if (!isWin || cmd !== 'npm') return cmd;

  return `${cmd}.cmd`;
}

function runCmd(cmd, _args, fn) {
  cmd = compatibleWinEnv(cmd);

  const args = _args || [];
  const runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: getRunCmdEnv(),
  });

  runner.on('close', (code) => {
    if (fn) {
      fn(code);
    }
  });
}

module.exports = runCmd;
