import { Dirent, readdir } from 'fs';

const PAGES_PATH = 'dist/pages';

const fileProcess = async (pagesPath: string, file: Dirent) => {
  if (file.isDirectory())
    return await _getPagesFiles(`${pagesPath}/${file.name}`);

  return `${pagesPath}/${file.name}`;
};

export const _getPagesFiles = async (pagesPath = PAGES_PATH) => {
  const files: Dirent[] = await new Promise((resolve, reject) => {
    readdir(pagesPath, { withFileTypes: true }, (err, files) => {
      if (err) reject();
      resolve(files);
    });
  });

  const fileList = await Promise.all(
    files.map(async (file) => await fileProcess(pagesPath, file))
  );

  return [...fileList.flat()];
};

export const getPagesFiles = async () => {
  return await _getPagesFiles();
};
