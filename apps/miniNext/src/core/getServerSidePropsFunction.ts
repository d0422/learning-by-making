import path from 'path';
import { _getPagesFiles } from './getPagesFiles';

type ServerSideFunction = Record<string, Function>;

export const getServerSidePropsFunction = async () => {
  const result: ServerSideFunction = {};

  const files = await _getPagesFiles();
  files.map((file) => {
    const { getServerSideProps } = require(path.resolve(file));
    result[file] = getServerSideProps;
  });
  return result;
};
