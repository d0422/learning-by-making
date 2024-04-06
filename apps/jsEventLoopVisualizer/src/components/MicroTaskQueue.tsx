import {
  centeredFlexBoxColumn,
  microTaskQueue,
  leftTitle,
  leftFlexBox,
} from '@/style.css';
import { Task } from './Task';
import { useMicroQueue } from '@/hooks/useMicroQueue';

export const MicroTaskQueue = () => {
  const tasks = useMicroQueue((state) => state.microTask);
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>MicroTaskQueue</div>
      <div className={`${microTaskQueue} ${leftFlexBox}`}>
        {tasks.map((task) => (
          <Task key={task.code} data={task}></Task>
        ))}
      </div>
    </div>
  );
};
