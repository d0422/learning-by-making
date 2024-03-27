import React from '@core/React';

const Introduce = () => {
  return (
    <div>
      <h2>이 프로젝트에 대하여</h2>
      <div
        style={{
          paddingBottom: '10px',
        }}
      >
        vite 번들러, JSX를 사용해 virtual DOM, useState를 구현하였습니다.
      </div>
      <div
        style={{
          paddingBottom: '10px',
        }}
      >
        본 레포지토리는 <b>리액트의 useState처럼</b> 동작 하는 코드를 작성하여
        똑같이 동작하게 만듭니다.
        <div>
          다만, 똑같이 동작하게 해보는 것이지 리액트와 100% 동일한 코드를
          작성하려 하는 것이 아닙니다.
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Introduce;
