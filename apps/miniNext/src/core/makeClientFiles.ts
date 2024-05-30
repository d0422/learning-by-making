import { existsSync, mkdirSync, writeFile } from 'fs';
import path from 'path';
import { findPagesFiles } from './routeMapper';

export const makeClientFiles = async () => {
  const files = await findPagesFiles('src/pages');
  if (!existsSync(path.resolve(__dirname, `../../public`))) {
    mkdirSync(path.resolve(__dirname, `../../public`));
  }
  files.forEach((fullFileName) => {
    const [fileName] = fullFileName.split('.tsx');

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

makeClientFiles();
