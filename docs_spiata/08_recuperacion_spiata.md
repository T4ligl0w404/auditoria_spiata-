## 1. Estrategia de Mejora Tecnológica Continua
Para mitigar el riesgo residual tras las correcciones de código, EduKids adoptará las siguientes dos tecnologías de protección perimetral e infraestructura:

1.  **Content Security Policy (CSP):** Configuración de un encabezado HTTP restrictivo a nivel de servidor que defina explícitamente qué orígenes de scripts son válidos, reduciendo a cero el impacto de ataques XSS remotos maliciosos.
2.  **Principio de Menor Privilegio:** Migración y aislamiento de la aplicación web para que se ejecute bajo un usuario del sistema operativo limitado (por ejemplo, el usuario estándar `www-data`), impidiendo que una inyección de comandos afecte archivos raíz (`root`).

---

## 2. Plan de Recuperación ante Desastres (Disaster Recovery Plan)
En caso de un incidente de seguridad crítico en el portal preescolar, se activa el protocolo de emergencia estructurado en tres fases:

*   **Fase de Contención Inmediata:** Identificación de la IP de origen atacante y aislamiento temporal del portal web (modo mantenimiento) para evitar la filtración continuada de fichas de menores.
*   **Fase de Mitigación y Reparación:** Depuración inmediata del código comprometido, revocación de todas las cookies y sesiones activas de los apoderados, y auditoría forzada de integridad sobre la base de datos de matrículas.
*   **Fase de Restauración Segura:** Levantamiento de la última copia de seguridad programada en un ambiente limpio, validando la consistencia de los datos de los alumnos antes de reabrir el portal al público.