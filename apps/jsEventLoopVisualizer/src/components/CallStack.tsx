import { callStack, centeredFlexBoxColumn, titleText } from '@/style.css';
export const CallStack = () => {
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={titleText}>Call Stack</div>
      <div className={callStack} />
    </div>
  );
};
