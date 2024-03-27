import React from '@core/React';
import Title from './Title';
import Button from './Button';

const ButtonTest = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Title title="버튼" />
      <Button title="Button Counter1" initialValue={0} />
      <Button title="Button Counter2" initialValue={10} />
    </div>
  );
};

export default ButtonTest;
