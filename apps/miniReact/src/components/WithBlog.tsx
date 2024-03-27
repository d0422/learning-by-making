import React from '@core/React';
const WithBlog = () => {
  const style = {
    paddingTop: '10px',
  };
  return (
    <div>
      <hr />
      <h3>블로그 글과 함께 보기</h3>
      <a href="https://0422.tistory.com/317" style={style}>
        리액트를 만들면서 이해해보자 (1) - JSX와 React.createElement
      </a>
      <a href="https://0422.tistory.com/318" style={style}>
        리액트를 만들면서 이해해보자 (2) - render, rerender
      </a>
      <a href="https://0422.tistory.com/319" style={style}>
        리액트를 만들면서 이해해보자 (3) - virtual dom과 diffing
      </a>
      <a href="https://0422.tistory.com/320" style={style}>
        리액트를 만들면서 이해해보자 (4) - useState
      </a>
      <a href="https://0422.tistory.com/321" style={style}>
        진짜 리액트는 어떻게 생겼나? (1) - useState 따라가며 흐름잡기
      </a>
      <a href="https://0422.tistory.com/322" style={style}>
        진짜 리액트는 어떻게 생겼나? (2) - renderWithHooks와 훅의 본체
      </a>
    </div>
  );
};

export default WithBlog;
