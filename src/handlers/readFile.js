import { resolve } from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

export default async (pathToFile) => {
  await pipeline(
    createReadStream(resolve(pathToFile)),
    async (source) => {
      source.setEncoding('utf8');
      for await (const chunk of source) {
        console.log(chunk);
      }
    }
  );
};
