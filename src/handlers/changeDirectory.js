import { resolve } from 'path';

export default (newDirectory) => {
  process.chdir(resolve(newDirectory));
}
