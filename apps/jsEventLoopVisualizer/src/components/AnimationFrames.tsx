import { useJobQueue } from '@/hooks/useJobQueue';
import {
  animationFrames,
  centeredFlexBoxColumn,
  leftFlexBox,
  leftTitle,
} from '@/style.css';
import { Task } from './Task';

export const AnimationFrames = () => {
  const animationFramesQueue = useJobQueue((state) => state.animationFrames);
  const tasks = animationFramesQueue.getQueueList();
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>AnimationFrames</div>
      <div className={`${animationFrames} ${leftFlexBox}`}>
        {tasks.map((task) => (
          <Task key={task} data={task} />
        ))}
      </div>
    </div>
  );
};
