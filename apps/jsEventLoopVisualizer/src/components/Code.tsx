import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { useEffect, useState } from 'react';
import 'highlight.js/styles/vs2015.css';
import { codeArea, editorContainer, textArea } from '@/style.css';
Promise.resolve();
export const Code = () => {
  const [code] = useState(`
  function foo(){
    console.log("microTask");
  }
  
  function bar(){
    console.log("macroTask");
  }

  function animation(){
    console.log("animation");
  }

  setTimeout(bar,0);
  Promise.resolve().then(foo);
  requestAnimationFrame(animation);
  
  `);
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
  }, [code]);

  return (
    <div className={editorContainer}>
      <textarea
        className={textArea}
        // onChange={(e) => setCode(e.target.value)}
        readOnly
      >
        {code}
      </textarea>
      <pre className={codeArea}>
        <code dangerouslySetInnerHTML={{ __html: hightLightedCode }}></code>
      </pre>
    </div>
  );
};
