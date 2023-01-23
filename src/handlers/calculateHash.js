import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { createHash } from 'crypto';

export default async (pathToFile) => {
  const data = await readFile(resolve(pathToFile));
  const hash = createHash('sha256').update(data);
  console.log(hash.digest('hex'));
}
