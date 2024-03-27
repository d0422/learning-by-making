import React from '@core/React';
import { Header } from './components/Header';
import Introduce from '@components/Introduce';
import WithBlog from '@components/WithBlog';
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
