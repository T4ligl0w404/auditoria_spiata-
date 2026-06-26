import { useEffect, useState } from 'react';
import { useMarkdownParser } from '../hooks/useMarkdownParser';

export default function MarkdownViewer({ filePath }) {
  const [md, setMd] = useState('Cargando...');
  const html = useMarkdownParser(md);

  useEffect(() => {
    fetch(filePath)
      .then((r) => r.text())
      .then(setMd)
      .catch(() => setMd('Error al cargar el archivo'));
  }, [filePath]);

  return (
    <div className="markdown-viewer-container">
      <div className="markdown-content-box">
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
