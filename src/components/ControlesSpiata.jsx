import { useEffect, useState } from 'react';

export default function ControlesSpiata() {
  const [md, setMd] = useState('Cargando...');

  useEffect(() => {
    fetch('/docs_spiata/07_controles_spiata.md')
      .then((r) => r.text())
      .then(setMd)
      .catch(() => setMd('Error al cargar el archivo'));
  }, []);

  return (
    <div>
      <h2>Controles SPIATA</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{md}</pre>
    </div>
  );
}
