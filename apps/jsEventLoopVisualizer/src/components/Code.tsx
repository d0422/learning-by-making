import { useEffect } from 'react';
import 'highlight.js/styles/vs2015.css';
import { codeArea, editorContainer, textArea } from '@/style.css';
import { useCode } from '@/stores/useCode';
import { useProcessCode } from '@/hooks/useProcessCode';
import { useHighlightCode } from '@/hooks/useHightlightCode';

export const Code = () => {
  const { code } = useCode();
  const { parseUserCode } = useProcessCode();
  const hightLightedCode = useHighlightCode();

  useEffect(() => parseUserCode(code), [code]);

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
