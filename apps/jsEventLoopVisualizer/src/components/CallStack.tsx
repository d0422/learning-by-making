import { useJobQueue } from '@/hooks/useJobQueue';
import { callStack, centeredFlexBoxColumn, titleText } from '@/style.css';
import { Task } from './Task';
export const CallStack = () => {
  const callStacks = useJobQueue((state) => state.callStack);
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={titleText}>Call Stack</div>
      <div className={callStack}>
        {callStacks.map((task) => (
          <Task key={task} data={task} />
        ))}
      </div>
    </div>
  );
};
