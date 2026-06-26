import { useMemo } from 'react';

export function useMarkdownParser(markdown) {
  return useMemo(() => {
    if (!markdown || markdown === 'Cargando...' || markdown.includes('Error')) {
      return `<p>${markdown}</p>`;
    }

    let html = markdown;

    // Procesar tablas (GitHub Flavored Markdown) - versión mejorada
    html = html.replace(
      /\|(.+?)\|\n\|[\s|:-]+\|\n((?:\|.+?\|\n?)*)/gm,
      (match) => {
        const lines = match.split('\n').filter(line => line.trim());
        if (lines.length < 2) return match;

        const headerLine = lines[0];
        const separatorLine = lines[1];
        const dataLines = lines.slice(2);

        // Validar que sea una tabla válida
        if (!separatorLine.match(/^\|[\s|:-]+\|$/)) return match;

        const headerCells = headerLine
          .split('|')
          .slice(1, -1)
          .map(cell => cell.trim());

        let table = '<div class="markdown-table-container"><table class="markdown-table"><thead><tr>';
        headerCells.forEach((cell) => {
          table += `<th>${sanitizeHtml(cell)}</th>`;
        });
        table += '</tr></thead><tbody>';

        dataLines.forEach((row) => {
          const cells = row.split('|').slice(1, -1);
          table += '<tr>';
          cells.forEach((cell) => {
            table += `<td>${sanitizeHtml(cell.trim())}</td>`;
          });
          table += '</tr>';
        });

        table += '</tbody></table></div>';
        return table;
      }
    );

    // Procesar encabezados
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Procesar negritas
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Procesar cursivas
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Procesar links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Procesar listas desordenadas
    html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

    // Procesar líneas horizontales
    html = html.replace(/^---$/gm, '<hr />');

    // Procesar párrafos
    const lines = html.split('\n');
    let result = '';
    let inList = false;
    let inTable = false;

    lines.forEach((line) => {
      if (line.includes('<table')) {
        inTable = true;
        result += line;
      } else if (line.includes('</table>')) {
        result += line + '\n';
        inTable = false;
      } else if (inTable) {
        result += line + '\n';
      } else if (
        line.match(/^<h[1-6]>/) ||
        line.match(/^<ul>/) ||
        line.match(/^<\/ul>/) ||
        line === '<hr />' ||
        line === ''
      ) {
        result += line + '\n';
      } else if (line.match(/^<li>/)) {
        if (!inList) {
          inList = true;
        }
        result += line + '\n';
      } else if (inList && !line.match(/^<li>/)) {
        inList = false;
        if (line.trim()) result += `<p>${line}</p>\n`;
      } else if (line.trim()) {
        result += `<p>${line}</p>\n`;
      }
    });

    return result;
  }, [markdown]);
}

function sanitizeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
