import { resolve } from 'path';
import { stat } from 'fs/promises';

export default async (path) => {
  const stats = await stat(resolve(path));
  return stats.isFile();
};
