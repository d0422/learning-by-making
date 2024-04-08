import { leftFlexBox } from '@/style.css';
import { useSchedule } from '@/hooks/useSchedule';
import { Button } from './Button';
import { useState } from 'react';
import { useCode } from '@/stores/useCode';
import { useProcessCode } from '@/hooks/useProcessCode';

export const ControllButtons = () => {
  const { startSchedule, stopSchedule, isScheduling } = useSchedule();
  const [active, setActive] = useState<'RUN' | 'STOP'>();
  const [initialize, setInitialize] = useState(true);
  const { code } = useCode();
  const { parseUserCode } = useProcessCode();

  const initializer = () => {
    if (initialize) {
      parseUserCode(code);
      run();
      setActive('RUN');
      setInitialize(false);
    }
  };

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
      <Button name={initialize ? 'START' : 'RESET'} onClick={initializer} />
      <Button name="RUN" onClick={run} isActive={active === 'RUN'} />
      <Button name="STOP" onClick={stop} isActive={active === 'STOP'} />
    </div>
  );
};
