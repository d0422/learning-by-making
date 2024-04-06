import { task } from '@/style.css';
import { TaskType } from '@/type';

export const Task = ({ data }: { data: TaskType }) => {
  return <div className={task}>{data.code}</div>;
};
