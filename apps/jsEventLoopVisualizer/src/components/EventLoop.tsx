import { EventLoopSVG } from '@assets/EventloopSVG';
import { centeredFlexBoxColumn, text } from '@/style.css';

export const EventLoop = () => {
  return (
    <div className={centeredFlexBoxColumn}>
      <EventLoopSVG width={50} height={50} />
      <div className={text}>Event Loop</div>
    </div>
  );
};
