import { style, globalStyle, keyframes } from '@vanilla-extract/css';
export const leftFlexBox = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 5,
});

export const centeredFlexBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
});

export const centeredFlexBoxColumn = style([
  centeredFlexBox,
  {
    flexDirection: 'column',
  },
]);

export const titleText = style({
  fontSize: '20px',
});

export const text = style({
  fontSize: '15px',
  textAlign: 'center',
});

export const leftText = style({
  textAlign: 'left',
  width: '100%',
});

export const task = style({
  backgroundColor: '#272823',
  color: '#d3d3d3',
  padding: '15px',
  borderRadius: 10,
  transition: 'all',
});

export const leftTitle = style([titleText, leftText]);

const baseContainer = style({
  borderRadius: 15,
  borderWidth: 1,
  borderStyle: 'double',
  paddingLeft: 10,
  paddingRight: 10,
});

export const callStack = style([
  baseContainer,
  {
    width: '300px',
    height: '500px',
    borderColor: '#77BE4C',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
]);

export const macroTaskQueue = style([
  baseContainer,
  {
    borderColor: '#DD9404',
    width: '500px',
    height: '100px',
  },
]);

export const microTaskQueue = style([
  baseContainer,
  {
    borderColor: '#E7D12F',
    width: '500px',
    height: '100px',
  },
]);

export const animationFrames = style([
  baseContainer,
  {
    borderColor: '#FF8080',
    width: '500px',
    height: '100px',
  },
]);

globalStyle('html, body', {
  backgroundColor: '#171717',
  fontFamily: 'Pretendard-Regular',
  color: '#fefefe',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const infiniteRotate = style({
  animationName: rotate,
  animationDuration: '2s',
  animationIterationCount: 'infinite',
});
