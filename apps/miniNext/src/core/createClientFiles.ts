import { existsSync, mkdirSync, writeFile } from 'fs';
import path from 'path';
import { getPagesFiles } from './getPagesFiles';

export const createClientFiles = async () => {
  const files = await getPagesFiles('src/pages');
  const isExists = existsSync(path.resolve('public'));
  if (!isExists) mkdirSync(path.resolve('public'));

  files.forEach((fullFileName) => {
    const fileName = fullFileName
      .replace(/src\/pages\//, '')
      .replace(/\.tsx/, '');

    if (fileName.match('/')) {
      const filePaths = fileName.split('/');
      const dirPath = filePaths.slice(0, -1).join('/');
      const isExists = existsSync(path.resolve('public', dirPath));
      if (!isExists) {
        mkdirSync(path.resolve('public', dirPath), {
          recursive: true,
        });
      }
    }
    writeFile(
      path.resolve(`public/${fileName}.tsx`),
      `import * as Page from '@/pages/${fileName}';
import { hydrate } from '@core/render';

hydrate(Page.default, document.getElementById('_miniNext'));
  
  `,
      (err) => {
        if (err) console.log(err);
      }
    );
  });
};

createClientFiles();
