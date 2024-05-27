import { readdir } from 'fs';
import path from 'path';

const PAGES_PATH = 'dist/pages';

interface ServerSidePage {
  pageName: string;
  serverSideFunction: Function;
}

export const getServerSidePropsFunction = async () => {
  const result: ServerSidePage[] = [];
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
    result.push({
      pageName: file,
      serverSideFunction: getServerSideProps,
    });
  });
  return result;
};
