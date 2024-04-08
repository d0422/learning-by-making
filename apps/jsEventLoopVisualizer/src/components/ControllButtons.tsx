import { leftFlexBox } from '@/style.css';
import { useSchedule } from '@/hooks/useSchedule';
import { Button } from './Button';
import { useState } from 'react';

export const ControllButtons = () => {
  const { startSchedule, stopSchedule, isScheduling } = useSchedule();
  const [active, setActive] = useState<'RUN' | 'STOP'>();
  const run = () => {
    if (isScheduling) return;
    startSchedule();
    setActive('RUN');
  };

  const stop = () => {
    if (!isScheduling) return;
    stopSchedule();
    setActive('STOP');
  };
  return (
    <div className={leftFlexBox}>
      <Button name="RUN" onClick={run} isActive={active === 'RUN'} />
      <Button name="STOP" onClick={stop} isActive={active === 'STOP'} />
    </div>
  );
};
