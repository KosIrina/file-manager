import { parse, resolve } from 'path';
import { rename } from 'fs/promises';

export default async (pathToFile, newFileName) => {
  const { dir } = parse(resolve(pathToFile));
  await rename(resolve(pathToFile), resolve(dir, newFileName));
};
