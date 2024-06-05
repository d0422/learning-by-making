import { Dirent, readdir } from 'fs';

const PAGES_PATH = 'dist/pages';

export const getPagesFiles = async (path = PAGES_PATH) => {
  return await new Promise<string[]>((resolve, reject) => {
    readdir(path, { recursive: true }, (err, files) => {
      if (err) reject(err);
      resolve(files as string[]);
    });
  });
};
