import { readdir } from 'fs';
import path from 'path';
const PAGES_PATH = 'dist/pages';

export const getPagesFiles = async (pathString = PAGES_PATH) => {
  return await new Promise<string[]>((resolve, reject) => {
    readdir(
      path.resolve(__dirname, '../../', pathString),
      { recursive: true },
      (err, files) => {
        if (err) reject(err);
        resolve((files as string[]).filter((file) => file.match('.js')));
      }
    );
  });
};
