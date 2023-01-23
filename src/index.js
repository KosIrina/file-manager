import { homedir } from 'os';
import { chdir, argv, stdout, stdin, nextTick, exit } from 'process';
import * as readline from 'readline';
import { errorMessages } from './constants/index.js';
import { default as showCurrentDirectory } from './helpers/showCurrentDirectory.js';
import { goUp, changeDirectory, listContent, getOsInfo, calculateHash, useBrotliCompression, readFile, createEmptyFile, copyFile, deleteFile, renameFile } from './handlers/index.js';

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

  rl.on('line', async (input) => {
    const [command, arg1, arg2] = input.split(' ');
    try {
      switch (command) {
        case '.exit':
          if (arg1) {
            throw new Error(errorMessages.invalidInput);
          }
          rl.close();
          return;
        case 'up':
          if (arg1) {
            throw new Error(errorMessages.invalidInput);
          }
          goUp();
          break;
        case 'cd':
          if (!arg1 || arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          changeDirectory(arg1);
          break;
        case 'ls':
          if (arg1) {
            throw new Error(errorMessages.invalidInput);
          }
          await listContent();
          break;
        case 'os':
          if (!arg1 || arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await getOsInfo(arg1);
          break;
        case 'hash':
          if (!arg1 || arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await calculateHash(arg1);
          break;
        case 'compress':
          if (!arg1 || !arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await useBrotliCompression(arg1, arg2, 'compress');
          break;
        case 'decompress':
          if (!arg1 || !arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await useBrotliCompression(arg1, arg2, 'decompress');
          break;
        case 'cat':
          if (!arg1 || arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await readFile(arg1);
          break;
        case 'add':
          if (!arg1 || arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await createEmptyFile(arg1);
          break;
        case 'cp':
          if (!arg1 || !arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await copyFile(arg1, arg2);
          break;
        case 'rm':
          if (!arg1 || arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await deleteFile(arg1);
          break;
        case 'mv':
          if (!arg1 || !arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await copyFile(arg1, arg2);
          await deleteFile(arg1);
          break;
        case 'rn':
          if (!arg1 || !arg2) {
            throw new Error(errorMessages.invalidInput);
          };
          await renameFile(arg1, arg2);
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
