import React from '@core/React';
import { useState } from './core/useState';
import { Header } from './components/Header';
import Button from '@components/Button';
import Form from '@components/Form';
import Introduce from '@components/Introduce';
import WithBlog from '@components/WithBlog';
import Title from '@components/Title';
import ButtonTest from '@components/ButtonTest';
import FormTest from '@components/FormTest';

const App = () => {
  return (
    <div>
      <Header />
      <Introduce />
      <h2>테스트 해보기</h2>
      <ButtonTest />
      <FormTest />
      <WithBlog />
    </div>
  );
};

export default App;
