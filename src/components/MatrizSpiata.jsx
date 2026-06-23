import { useEffect, useState } from 'react';

export default function MatrizSpiata() {
  const [md, setMd] = useState('Cargando...');

  useEffect(() => {
    fetch('/docs_spiata/06_matriz_spiata.md')
      .then((r) => r.text())
      .then(setMd)
      .catch(() => setMd('Error al cargar el archivo'));
  }, []);

  return (
    <div>
      <h2>Matriz SPIATA</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{md}</pre>
    </div>
  );
}
