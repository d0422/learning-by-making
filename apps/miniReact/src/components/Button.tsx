import { useState } from '@core/useState';
import React from '@core/React';

const Button = ({
  title,
  initialValue,
}: {
  title: string;
  initialValue: number;
}) => {
  const [count, setCount] = useState(initialValue);
  return (
    <div
      style={{
        display: 'flex',
        width: '400px',
        gap: '20px',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <div>{title}</div>
      <span>{count}</span>
      <button
        onclick={() => {
          setCount(count + 1);
        }}
      >
        Click me!
      </button>
    </div>
  );
};

export default Button;
