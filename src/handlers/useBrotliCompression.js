import { resolve, parse } from 'path';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { default as checkIfFile } from '../helpers/isFile.js';
import { default as checkIfDirectory } from '../helpers/isDirectory.js';
import { errorMessages } from '../constants/index.js';

export default async (pathToFile, pathToDestination, type) => {
  try {
    const isFile = await checkIfFile(pathToFile);
    const isDirectory = await checkIfDirectory(pathToDestination);

    if (!isFile || !isDirectory) {
      throw new Error(errorMessages.invalidInput);
    }

    if (type === 'compress') {
      await pipeline(createReadStream(resolve(pathToFile)), createBrotliCompress(), createWriteStream(resolve(pathToDestination, `${pathToFile}.br`)));
    } else if (type === 'decompress') {
      const { name: fileName, ext: fileExt } = parse(pathToFile);
      if (fileExt !== '.br') {
        throw new Error(errorMessages.invalidInput);
      }
      await pipeline(createReadStream(resolve(pathToFile)), createBrotliDecompress(), createWriteStream(resolve(pathToDestination, fileName)));
    }
  } catch {
      console.log(errorMessages.invalidInput);
  }
};
