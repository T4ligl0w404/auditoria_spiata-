### 1. Prompt de 01_resumen

* **Prompt que use:** > *"Actúa como un auditor senior de ciberseguridad web. Necesito redactar la introducción de mi informe de auditoría. La empresa asignada es 'E24 — EduKids Jardín Infantil', orientada a la educación preescolar. Explica de forma detallada pero con lenguaje básico por qué custodiar datos de menores y apoderados en su portal web eleva el impacto crítico del negocio ante cualquier vulnerabilidad."*

* **Que acepté y que corregí:** Acepté la redacción formal que conectaba el marco ético-legal de la Ley 21.459 en Chile con la realidad de un jardín infantil. Corregí el enfoque inicial de la IA, ya que se centraba demasiado en pérdidas financieras, y reorienté el texto para priorizar el impacto reputacional y la privacidad física de las familias y los menores de edad.

---

### 2. Prompt 02_sqli

* **Prompt que use:** > *"Ayúdame a redactar el análisis técnico de una Inyección SQL. En mi laboratorio controlado DVWA en nivel Low, ingresé el payload `' OR '1'='1` y el sistema expuso todas las cuentas. Explica el porqué funciona este ataque usando una analogía didáctica simple y genera un bloque de código seguro mandatorio en PHP que use consultas parametrizadas para proteger el portal de EduKids."* inserte la imagen donde mostraba la falla sqli para que asi pudiera igual responder a base de eso.

* **Que acepté y que corregí:** Acepté la analogía pedagógica del 'guardia y el archivador' para explicar cómo la comilla rompe la delimitación lógica. Supervisé el código PHP generado y para que en el componente de React quedara perfectamente claro cómo se fuerza el tipo de dato entero.

---

### 3. Prompt 03_xss

* **Prompt que use:** > *"Genera un contenido enfocado en XSS Reflejado. El payload usado en DVWA fue `<script>alert('XSS')</script>`. Detalla con peras y manzanas qué pasa en el navegador cuando la aplicación refleja la entrada sin sanitizar, evalúa la severidad CVSS v3.1 justificando el riesgo de secuestro de sesión de los apoderados de EduKids, y entrega la solución usando la función `htmlspecialchars`."* Nuevamente aqui inserte la imagen donde mostraba la falla de xss para que asi pudiera igual responder a base de eso.

* **Que acepté y que corregí:** Acepté la explicación del navegador interpretando etiquetas de código en lugar de texto plano. Modifiqué la métrica de severidad propuesta originalmente por la IA, elevando cualitativamente el impacto en el negocio preescolar, debido a que el robo de cookies de un apoderado permite suplantar su identidad y acceder a bitácoras de retiro de los niños.

---

### 4. Prompt 04_comandos

* **Prompt que use:** > *"Necesito la estructura técnica  para Inyección de Comandos. En el cuadro 'Ping a device' de DVWA ingresé `127.0.0.1; cat /etc/passwd` y me devolvió la lista de usuarios del sistema Linux. Explica detalladamente que ocurrió y el por qué ocurrió y demuestra por qué este hallazgo es de severidad Crítica (CVSS ~9.8) para el servidor central de EduKids."*  Y aqui tambien inserte la imagen que mostraba la falla de comandos

* **Que acepté y que corregí:** Acepté la descripción de la información entregada del cómo y porque ocurrió. Corregí el código de mitigación genérico que propuso la IA, reemplazándolo por una validación estricta basada en la función nativa `filter_var` de PHP para asegurar el cumplimiento real de una lista blanca de direcciones IP.

---

### 5. IPrompt 05_activos

* **Prompt que use:** > *"Crea una tabla en Markdown  que contenga un inventario de los 3 activos de información más críticos del portal de clientes de EduKids Jardín Infantil. Asócialos directamente con los riesgos de las vulnerabilidades técnicas auditadas (SQLi, XSS, Cmd Injection) e incluye columnas de ID, Tipo de Activo, Descripción y Clasificación de seguridad."*

* **Que acepté y que corregí:** Acepté la categorización y estructura de la tabla de activos (Base de Datos, Servidor e Identidades en Tránsito). Al pegarlo en mi entorno React, el cuadro se rompió visualmente; identifiqué que la IA introdujo saltos de línea incorrectos en las descripciones largas, por lo que reestructuré manualmente el Markdown en líneas continuas para que se renderizara perfectamente. (aqui estuve medio que adivine)

---

### 6. Prompt 06_matriz

* **Prompt que use:** > *"Actúa como un experto en gestión de riesgos de TI. Necesito los datos estructurados para el archivo de EduKids. Diseña una matriz que evalúe y priorice los tres riesgos informáticos de los ataques utilizando una escala de 1 a 5 para Probabilidad e Impacto. Proporcióname también un objeto JSON limpio que pueda usar más adelante en un componente mapa de calor de React."*

* **Que acepté y que corregí:** Acepté la lógica de cálculo matemático Probabilidad x Impacto. Modifiqué los valores del JSON asignados por defecto para que la inyección SQL (`R-SQLi`) tuviera el impacto máximo (5), alinerándose fielmente con la gravedad de exponer datos confidenciales de menores de edad.

---

### 7. Prompt 07_controles

* **Prompt que use:** > *"Cuales serian las politicas organizacionales y las mitigaciones técnicas de EduKids. Separa claramente las reglas institucionales que debe seguir EduKids (nivel preventivo) de las acciones técnico-prácticas que se deben codificar en el backend para erradicar por completo los tres ataques analizados en la auditoría web."*

* **Que acepté y que corregí:** Acepté la división formal entre políticas organizacionales y controles prácticos. Corregí la redacción de la sección de inyección de comandos, ya que la IA olvidó incorporar el concepto de 'Aislamiento de Capas'. Modifiqué el texto para dejar claro que la interfaz del apoderado jamás debe interactuar con privilegios elevados en el sistema operativo.

---

### 8. Prompt 08_recuperación

* **Prompt que use:** > *"Detalla una estrategia de mejora continua incorporando Content Security Policy (CSP) y el principio de menor privilegio. Además, estructura un Plan de Recuperación ante Desastres (DRP) dividido didácticamente en tres fases claras (Contención, Mitigación y Restauración Segura) en caso de que el portal preescolar sufra un hackeo."*

* **Que acepté y que corregí:** Acepté las tres fases secuenciales para el plan de contingencia operativa del jardín infantil. Modifiqué la sección de restauración para hacer énfasis en que, antes de volver a levantar el sitio web en Vercel, la base de datos de matrículas debe pasar por una validación forzada de integridad para asegurar que ningún registro de los alumnos haya sido manipulado.