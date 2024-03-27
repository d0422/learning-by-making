import React from '@core/React';
import Form from './Form';
import Title from './Title';

const FormTest = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Title title="입력폼" />
      <Form />
    </div>
  );
};

export default FormTest;
