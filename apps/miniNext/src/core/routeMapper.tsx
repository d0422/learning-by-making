const PAGES_PATH = 'dist/pages';
import { readdir } from 'fs';
import path from 'path';
import { Express, Request, Response } from 'express';
import { getServerSidePropsFunction } from './getServerSidePropsFunction';
import { createHTML } from './createHTML';
import { getPagesFiles } from './getPagesFiles';

const getRoutingPath = (fileName: string) => {
  if (fileName === 'index') return '/';
  if (fileName.match('index')) return `/${fileName.replace('index', '')}`;
  return `/${fileName.toLowerCase()}`;
};

export const routeMapper = async (app: Express) => {
  const files = await getPagesFiles();

  files.forEach((fullFileName) => {
    const fileName = fullFileName
      .replace(/dist\/pages\//, '')
      .replace(/.js/, '');
    app.get(
      getRoutingPath(fileName),

      async (req: Request, res: Response) => {
        const serverSideFunctions = await getServerSidePropsFunction();
        const serverSideFunction = serverSideFunctions[fullFileName];
        const serverSideProps = serverSideFunction?.().props;
        const { default: Component } = require(
          path.resolve('dist/pages', fullFileName)
        );
        const html = createHTML(
          <Component {...serverSideProps} />,
          serverSideProps,
          fileName
        );
        res.send(html);
      }
    );
  });
};
