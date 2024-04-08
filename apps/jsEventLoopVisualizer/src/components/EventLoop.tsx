import { EventLoopSVG } from '@assets/EventloopSVG';
import { centeredFlexBoxColumn, infiniteRotate, text } from '@/style.css';
import { useScheduleInfo } from '@/stores/useSchduleInfo';

export const EventLoop = () => {
  const { isScheduling } = useScheduleInfo();
  return (
    <div className={`${centeredFlexBoxColumn}`}>
      <EventLoopSVG
        width={50}
        height={50}
        className={isScheduling ? infiniteRotate : undefined}
      />
      <div className={text}>Event Loop</div>
    </div>
  );
};
