import { rm } from 'fs/promises';
import { resolve } from 'path';

export default async (pathToFile) => {
  await rm(resolve(pathToFile));
};
