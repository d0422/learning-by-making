const PAGES_PATH = 'dist/pages';
import { readdir } from 'fs';
import path from 'path';
import { Express, Request, Response } from 'express';
import { getServerSidePropsFunction } from './findServerSideProps';
import { createHTML } from './createHTML';

const findPagesFiles = async () => {
  const files: string[] = await new Promise((resolve, reject) => {
    readdir(PAGES_PATH, (err, files) => {
      if (err) reject();
      resolve(files);
    });
  });
  return files;
};

const getRoutingPath = (fileName: string) => {
  if (fileName === 'index') return '/';
  return `/${fileName.toLowerCase()}`;
};

export const routeMapper = async (app: Express) => {
  const files = await findPagesFiles();
  files.forEach((fullFileName) => {
    const [fileName] = fullFileName.split('.js');

    app.get(
      getRoutingPath(fileName),

      async (req: Request, res: Response) => {
        const serverSideFunctions = await getServerSidePropsFunction();
        const serverSideFunction = serverSideFunctions[fullFileName];
        const serverSideProps = serverSideFunction?.().props;
        const { default: Component } = require(
          path.resolve(`${PAGES_PATH}`, fullFileName)
        );
        const html = createHTML(
          <Component {...serverSideProps} />,
          serverSideProps
        );
        res.send(html);
      }
    );
  });
};
