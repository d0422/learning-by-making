import { readdir } from 'fs';
import path from 'path';

const PAGES_PATH = 'dist/pages';

type ServerSideFunction = Record<string, Function>;

export const getServerSidePropsFunction = async () => {
  const result: ServerSideFunction = {};
  const files: string[] = await new Promise((resolve, reject) => {
    readdir(PAGES_PATH, (err, files) => {
      if (err) reject();
      resolve(files);
    });
  });

  files.map((file) => {
    const { getServerSideProps } = require(
      path.resolve(`${PAGES_PATH}/${file}`)
    );
    result[file] = getServerSideProps;
  });
  return result;
};
