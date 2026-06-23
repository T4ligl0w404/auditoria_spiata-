import { useEffect, useState } from 'react';

export default function RecuperacionSpiata() {
  const [md, setMd] = useState('Cargando...');

  useEffect(() => {
    fetch('/docs_spiata/08_recuperacion_spiata.md')
      .then((r) => r.text())
      .then(setMd)
      .catch(() => setMd('Error al cargar el archivo'));
  }, []);

  return (
    <div>
      <h2>Recuperación SPIATA</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{md}</pre>
    </div>
  );
}
