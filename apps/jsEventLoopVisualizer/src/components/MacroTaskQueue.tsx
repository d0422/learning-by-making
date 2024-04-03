import {
  centeredFlexBoxColumn,
  macroTaskQueue,
  leftTitle,
  leftFlexBox,
} from '@/style.css';
import { Task } from './Task';
import { useJobQueue } from '@/hooks/useJobQueue';

export const MacroTaskQueue = () => {
  const macroQueue = useJobQueue((state) => state.macroTask);
  const tasks = macroQueue.getQueueList();
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>MacroTaskQueue</div>
      <div className={`${macroTaskQueue} ${leftFlexBox}`}>
        {tasks.map((task) => (
          <Task key={task} data={task} />
        ))}
      </div>
    </div>
  );
};
