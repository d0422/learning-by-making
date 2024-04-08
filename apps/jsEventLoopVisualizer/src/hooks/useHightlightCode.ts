import { useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { useCode } from '@/stores/useCode';

export const useHighlightCode = () => {
  const { code } = useCode();
  const [hightLightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
  }, []);

  useEffect(() => {
    setHighlightedCode(
      hljs
        .highlight(code, { language: 'javascript' })
        .value.replace(/" "/g, '&nbsp; ')
    );
  });
  return hightLightedCode;
};
