import { EOL, cpus, userInfo, arch } from 'os';
import { errorMessages } from '../constants/index.js';

export default async (param) => {
  switch (param) {
    case '--EOL':
      console.log(JSON.stringify(EOL));
      break;
    case '--cpus':
      const info = cpus().map(({ model, speed }) => {
        return { model, speed: `${speed / 1000} GHz` };
      });
      console.log(`Total CPUS amount: ${info.length}`);
      console.table(info);
      break;
    case '--homedir':
      console.log(userInfo().homedir);
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch());
      break;
    default:
      throw new Error(errorMessages.invalidInput);
  }
}
