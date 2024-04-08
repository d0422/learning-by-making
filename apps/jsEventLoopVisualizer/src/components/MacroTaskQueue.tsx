import {
  centeredFlexBoxColumn,
  macroTaskQueue,
  leftTitle,
  leftFlexBox,
} from '@/style.css';
import { Task } from './Task';
import { useMacroQueue } from '@/stores/useMacroQueue';

export const MacroTaskQueue = () => {
  const tasks = useMacroQueue((state) => state.macroTask);
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>MacroTaskQueue</div>
      <div className={`${macroTaskQueue} ${leftFlexBox}`}>
        {tasks.map((task) => (
          <Task key={task.code} data={task} />
        ))}
      </div>
    </div>
  );
};
