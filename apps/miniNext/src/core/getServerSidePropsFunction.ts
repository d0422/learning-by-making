import path from 'path';
import { getPagesFiles } from './getPagesFiles';

type ServerSideFunction = Record<string, Function>;

export const getServerSidePropsFunction = async () => {
  const result: ServerSideFunction = {};

  const files = await getPagesFiles();
  files.map((file) => {
    const { getServerSideProps } = require(path.resolve('dist/pages', file));
    result[file] = getServerSideProps;
  });
  return result;
};
