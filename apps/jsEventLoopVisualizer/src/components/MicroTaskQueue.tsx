import { centeredFlexBoxColumn, microTaskQueue, leftTitle } from '@/style.css';

export const MicroTaskQueue = () => {
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>MicroTaskQueue</div>
      <div className={microTaskQueue} />
    </div>
  );
};
