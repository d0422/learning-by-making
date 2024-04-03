import { useJobQueue } from '@/hooks/useJobQueue';
import {
  centeredFlexBoxColumn,
  microTaskQueue,
  leftTitle,
  leftFlexBox,
} from '@/style.css';
import { Task } from './Task';

export const MicroTaskQueue = () => {
  const microQueue = useJobQueue((state) => state.microTask);
  const tasks = microQueue.getQueueList();
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>MicroTaskQueue</div>
      <div className={`${microTaskQueue} ${leftFlexBox}`}>
        {tasks.map((task) => (
          <Task key={task} data={task}></Task>
        ))}
      </div>
    </div>
  );
};
