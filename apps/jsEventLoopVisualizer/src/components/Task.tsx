import { task } from '@/style.css';

export const Task = ({ data }: { data: string }) => {
  return <div className={task}>{data}</div>;
};
