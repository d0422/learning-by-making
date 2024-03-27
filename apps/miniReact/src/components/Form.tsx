import { useState } from '@core/useState';
import React from '@core/React';

const Form = () => {
  const [value, setValue] = useState('');

  const onSubmit = (e: Event) => {
    e.preventDefault();
    alert(`${value} submited`);
  };

  return (
    <form
      onsubmit={onSubmit}
      style={{
        display: 'flex',
        gap: '4px',
      }}
    >
      <input
        style={{ padding: '10px' }}
        value={value}
        onchange={(e: Event) => setValue((e.target as HTMLInputElement).value)}
      />
      <button onclick={onSubmit}>Submit</button>
    </form>
  );
};

export default Form;
