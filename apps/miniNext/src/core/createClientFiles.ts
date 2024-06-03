import { existsSync, mkdirSync, writeFile } from 'fs';
import path from 'path';
import { _getPagesFiles } from './getPagesFiles';

export const createClientFiles = async () => {
  const files = await _getPagesFiles('src/pages');
  if (!existsSync(path.resolve(__dirname, `../../public`))) {
    mkdirSync(path.resolve(__dirname, `../../public`));
  }
  files.forEach((fullFileName) => {
    const fileName = fullFileName
      .replace(/src\/pages\//, '')
      .replace(/\.tsx/, '');
    writeFile(
      path.resolve(__dirname, `../../public/${fileName}.tsx`),
      `import * as Page from '@/pages/${fileName}';
import { hydrate } from '@core/render';

hydrate(Page.default, document.getElementById('_miniNext'));
  
  `,
      (err) => {
        console.log(err);
      }
    );
  });
};

createClientFiles();
