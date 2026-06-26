## 1. Políticas de Prevención (Políticas Organizacionales)
Se determinan las siguientes políticas institucionales obligatorias para el ciclo de desarrollo del software de EduKids:

*   **Política de Manejo de Parámetros:** Todo formulario web que se comunique con sistemas de almacenamiento persistente tiene estrictamente prohibido procesar entradas directas mediante uniones de texto o interpolaciones inseguras.
*   **Política de Aislamiento de Capas:** La interfaz web orientada a apoderados no debe poseer privilegios directos de ejecución de comandos sobre la infraestructura del sistema operativo.

---

## 2. Controles de Mitigación (Implementación Técnica)
Para reducir la probabilidad de ocurrencia evaluada en la matriz, se aplican controles específicos:

### A. Para el control de Inyección SQL
*   **Control Técnico:** Implementación mandatoria de sentencias preparadas (*Prepared Statements*).
*   **Acción:** Los parámetros ingresados por el apoderado se vinculan explícitamente a tipos específicos de variables (por ejemplo, enteros para IDs), neutralizando cualquier payload matemático malicioso.

### B. Para el control de XSS Reflejado
*   **Control Técnico:** Escapado de entidades HTML antes de la impresión en el navegador de la víctima.
*   **Acción:** Los caracteres `<` y `>` se transforman en entidades de texto no interpretables por la terminal del navegador, bloqueando la autoejecución de etiquetas javascript.

### C. Para el control de Inyección de Comandos (Command Injection)
*   **Control Técnico:** Validación estricta de entradas mediante Listas Blancas y el uso de funciones de filtrado nativas que no invoquen directamente la terminal del sistema operativo.
*   **Acción:** El sistema del jardín infantil jamás debe enviar texto libre redactado por el usuario hacia la consola del servidor. El campo de entrada se restringe mediante validadores del backend (como la función `filter_var` para asegurar que sea exclusivamente una dirección IP estructurada). Si la entrada contiene caracteres sospechosos de encadenamiento como punto y coma (`;`), barras o letras, el sistema bloquea y descarta la petición de inmediato antes de que sea ejecutada por la computadora central.