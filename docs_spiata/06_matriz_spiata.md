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

---

## 4. Representación Gráfica: Mapa de Calor (Matriz 5x5)

A continuación se presenta la distribución visual de los riesgos identificados en el portal de EduKids. Las celdas representan el cruce de los ejes de **Probabilidad (Líneas)** e **Impacto (Columnas)**.

| Probabilidad \ Impacto | 1 (Insignificante) | 2 (Menor) | 3 (Moderado) | 4 (Mayor) | 5 (Catastrófico) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **5 (Muy Alta)** | | | | | |
| **4 (Alta)** | | | **[R-XSS]** *(Nivel 12)* | | **[R-SQLi]** *(Nivel 20)* |
| **3 (Media)** | | | | | **[R-Cmd]** *(Nivel 15)* |
| **2 (Baja)** | | | | | |
| **1 (Muy Baja)** | | | | | |

---

## 5. Análisis del Mapa de Calor (Contexto Preescolar)

* **R-SQLi (Inyección SQL - Zona Roja / Crítica):** Se posiciona en un nivel de riesgo **20** debido a que la probabilidad de explotación es alta (al estar el portal expuesto a internet sin sanitización interna) y su impacto es catastrófico, ya que compromete directamente la confidencialidad de la base de datos de menores y apoderados.
* **R-Cmd (Inyección de Comandos - Zona Naranja / Alta):** Posee un nivel de riesgo **15**. Aunque su probabilidad es media debido a que requiere interactuar con paneles técnicos del backend, el impacto de tomar control completo de la terminal del servidor Linux destruyendo la disponibilidad de la plataforma preescolar es total.
* **R-XSS (XSS Reflejado - Zona Amarilla / Media):** Registra un nivel de riesgo **12**. Al ser un ataque reflejado que viaja de forma directa en el navegador, requiere que un apoderado haga clic en un enlace manipulado (interacción del usuario), disminuyendo su severidad técnica directa, pero manteniendo un riesgo corporativo moderado debido al secuestro de identidades (*Session Hijacking*).