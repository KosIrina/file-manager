import { writeFile } from 'fs/promises';
import { resolve } from 'path';

export default async (fileName) => {
  await writeFile(resolve(fileName), '', { flag: 'wx' });
};
