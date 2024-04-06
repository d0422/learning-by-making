import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { useEffect, useState } from 'react';
import 'highlight.js/styles/vs2015.css';
import { codeArea, editorContainer, textArea } from '@/style.css';
import { parse } from '@/utils/parse';
import { useFunction } from '@/hooks/useFunction';
import { useCallStack } from '@/hooks/useCallStack';
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
  const { inqueueCompileQueue } = useCallStack();
  const { addFunction } = useFunction();
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
  }, []);

  useEffect(() => {
    setHighlightedCode(
      hljs
        .highlight(code, { language: 'javascript' })
        .value.replace(/" "/g, '&nbsp; ')
    );

    const { expression, functionDeclare } = parse(code);

    expression.forEach((express) => {
      const codeString = code.slice(express.start, express.end);
      inqueueCompileQueue({
        code: codeString,
        expression: express,
        executed: false,
      });
    });
    functionDeclare.forEach((declare) => {
      const codeString = code.slice(declare.start, declare.end);
      addFunction(declare.id.name, codeString);
    });
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
