import { parse, resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

export default async (pathToFile, pathToNewDirectory) => {
  const { base } = parse(resolve(pathToFile));
  const readableStream = createReadStream(resolve(pathToFile));
  const writableStream = createWriteStream(resolve(pathToNewDirectory, base));

  await pipeline(readableStream, writableStream);
};
