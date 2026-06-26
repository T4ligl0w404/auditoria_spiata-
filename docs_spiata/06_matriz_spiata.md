## 1. Criterios de Evaluación Utilizados
Para evaluar el nivel de cada riesgo antes de aplicar las medidas de seguridad (*Riesgo Inherente*), se utiliza una escala estándar de 1 a 5 para Probabilidad e Impacto:

*   **Probabilidad:** 1 (Muy Baja) a 5 (Muy Alta)
*   **Impacto:** 1 (No tanto impacto) a 5 (Catastrófico)
*   **Nivel de Riesgo:** Valor de Probabilidad x Impacto

---

## 2. Clasificación y Priorización de Riesgos

| Nombre Riesgo | Descripción del Evento | Probabilidad | Impacto | Nivel de Riesgo | Prioridad de Atención |
|:---|:---|:---:|:---:|:---:|:---|
| **R-SQLi** | Puede ser una extracción masiva de bases de datos de los menores. | 4 | 5 | **20 (Es Crítico)** | **Inmediata** |
| **R-Cmd** | Puede generar una toma de control o destrucción de archivos del servidor. | 3 | 5 | **15 (Es Alto)** | **Urgente** |
| **R-XSS** | Se puede generar un secuestro de sesiones de tutores mediante enlaces manipulados. | 4 | 3 | **12 (Es Medio)** | **Programada** |

---

## 3. Estructura de Datos para el Mapa de Calor Visual (React)
El componente `Matriz.jsx` representará interactivamente esta matriz en un formato visual cuadrático de 5x5, coloreando dinámicamente las celdas críticas en color rojo:

```json
[
  { "id": "R-SQLi", "nombre": "Inyección SQL", "x": 4, "y": 5, "color": "red" },
  { "id": "R-Cmd", "nombre": "Inyección de Comandos", "x": 3, "y": 5, "color": "orange" },
  { "id": "R-XSS", "nombre": "XSS Reflejado", "x": 4, "y": 3, "color": "yellow" }
]