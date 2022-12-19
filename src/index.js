import { homedir } from 'os';
import { chdir, argv, stdout, stdin, nextTick, exit } from 'process';
import * as readline from 'readline';
import { errorMessages } from './constants/index.js';
import { default as showCurrentDirectory } from './helpers/showCurrentDirectory.js';
import { goUp } from './handlers/index.js';

try {
  if (!argv.slice(2).length) {
    throw new Error(errorMessages.invalidInput);
  }

  chdir(homedir());

  const args = Object.fromEntries(argv.slice(2).map((arg) => arg.split('=')));  
  const userName = args['--username'] ? args['--username'] : 'Anonym';

  stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  showCurrentDirectory();

  const rl = readline.createInterface({input: stdin, output: stdout}); 

  rl.on('line', input => {
    try {
      switch (input) {
        case '.exit':
          rl.close();
          return;
        case 'up':
          goUp();
          break;
        default:
          throw new Error(errorMessages.invalidInput);
      };
      showCurrentDirectory();
    } catch (err) {
      if (err.message === errorMessages.invalidInput) {
        console.log(errorMessages.invalidInput);
      } else {
        console.log(errorMessages.operationFailed);
      }
    }
  });

  process.on('SIGINT', () => rl.close());

  rl.on('close', () => {
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);
    nextTick(() => exit());
  });
} catch(err) {
    if (err.message === errorMessages.invalidInput) {
      console.log(errorMessages.invalidInput);
    } else {
      console.log(errorMessages.operationFailed);
    }
}
