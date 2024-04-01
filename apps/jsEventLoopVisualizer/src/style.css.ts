import { style, globalStyle } from '@vanilla-extract/css';

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

export const leftTitle = style([titleText, leftText]);

const baseContainer = style({
  borderRadius: 15,
  borderWidth: 1,
  borderStyle: 'double',
});

export const callStack = style([
  baseContainer,
  {
    width: '300px',
    height: '500px',
    borderColor: '#77BE4C',
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
