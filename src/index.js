import { homedir } from 'os';
import { chdir, argv, stdout, stdin, nextTick, exit } from 'process';
import * as readline from 'readline';
import { errorMessages } from './constants/index.js';
import { default as showCurrentDirectory } from './helpers/showCurrentDirectory.js';
import { goUp, changeDirectory } from './handlers/index.js';

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
    const [command, arg1, arg2] = input.split(' ');
    try {
      switch (command) {
        case '.exit':
          rl.close();
          return;
        case 'up':
          goUp();
          break;
        case 'cd':
          if (!arg1) {
            throw new Error(errorMessages.invalidInput);
          };
          changeDirectory(arg1);
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
      showCurrentDirectory();
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
