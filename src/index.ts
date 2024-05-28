import fs from 'fs';
import { setFailed, getInput, info } from '@actions/core';
import { formatAndNotify } from './utils';

const logFile = 'output.log';

try {
  const showCardOnStart = getInput(`show-on-start`).toLowerCase() == 'true';
  if (showCardOnStart) {
    formatAndNotify('start');
  } else {
    info('Configured to not show card upon job start.');
  }
} catch (error: any) {
  fs.appendFileSync(logFile, error);
  setFailed(error);
}
