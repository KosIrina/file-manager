import { readdir } from 'fs/promises';
import { resolve } from 'path';

export default async () => {
  const content = await readdir(resolve(process.cwd()), { withFileTypes: true });
  const contentSortedByType = { directories: [], files: [] };
  content.forEach((element) => {
    if (element.isDirectory()) {
      contentSortedByType.directories.push(element.name);
    } else if (element.isFile()) {
      contentSortedByType.files.push(element.name);
    }
  });
  if (!contentSortedByType.directories.length && !contentSortedByType.files.length) {
    console.log('Current folder has no directories or files');
    return;
  }
  console.table([...contentSortedByType.directories.sort((a, b) => a - b).map((element) => { return { ['Name']: element, ['Type']: 'Directory'} }), ...contentSortedByType.files.sort((a, b) => a - b).map((element) => { return { ['Name']: element, ['Type']: 'File'} })]);
}
