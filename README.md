# 프로젝트 개요

✅ 프론트엔드 생태계에서 중요한 개념들을 직접 만들면서 학습하는 과정을 담은 레포지토리입니다.

⚛️miniReact(useState구현), JS EventLoop Visualizer, Next의 핵심 기능을 직접구현하고, 이를 모노레포(pnpm+turborepo) 형태로 관리합니다

# 📄목차

1. [Mini React](https://github.com/d0422/learning-by-making/tree/main/apps/miniReact)
2. JS Eventloop visualizer
3. Mini Next

## Mini React

배포 주소 : https://d0422.pages.dev/

리액트**처럼** 동작하는 MiniReact입니다.
VDOM의 Diffing알고리즘을 직접 구현해보며 이전 DOM에서 바뀐 부분만 렌더링하는 기능을 중심으로 구현하였습니다.

![MiniReactGif](https://github.com/d0422/learning-by-making/assets/99241871/cb31ed63-a6ed-4f10-b1ad-59a114ad0967)

useState의 구현은 실제와 분명히 다르며, Fiber 아키텍쳐를 통해 hook을 관리하지 않고 JSX Element의 객체화에 그치고 있어 한계점이 분명한 코드입니다.
실제 리액트를 분석한 글을 참고해주세요.

1. [진짜 리액트는 어떻게 생겼나? (1) - useState 따라가며 흐름잡기](https://0422.tistory.com/321)
2. [진짜 리액트는 어떻게 생겼나? (2) - renderWithHooks와 훅의 본체](https://0422.tistory.com/322)
