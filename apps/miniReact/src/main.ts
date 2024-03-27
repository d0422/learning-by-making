import App from './App';
import React from '@core/React';
import { MiniReactNode } from '@core/createElement';

const app = document.getElementById('app') as HTMLElement;
React.render(App() as unknown as MiniReactNode, app);
