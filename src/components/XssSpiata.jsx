import { useEffect, useState } from 'react';

export default function XssSpiata() {
  const [md, setMd] = useState('Cargando...');

  useEffect(() => {
    fetch('/docs_spiata/03_xss_spiata.md')
      .then((r) => r.text())
      .then(setMd)
      .catch(() => setMd('Error al cargar el archivo'));
  }, []);

  return (
    <div>
      <h2>XSS SPIATA</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{md}</pre>
    </div>
  );
}
