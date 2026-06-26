## 1. Inventario de Activos de Información (EduKids)

Para la operación segura del portal de clientes de EduKids, se identifican tres activos de información principales, categorizados según su importancia:

| ID | Activo de Información | Tipo | Descripción | Clasificación |
|:---|:---|:---|:---|:---|
| **ACT-01** | Base de Datos de Matrículas | Digital (Software) | Ayuda a almacenar nombres de menores, RUT de apoderados, direcciones residenciales y teléfonos de emergencia. | **Confidencial / Crítico** |
| **ACT-02** | Servidor Web de la Aplicación | Infraestructura | Es el servidor encargado de generar el portal web de cara a internet y procesar las peticiones del backend. | **Alta Disponibilidad** |
| **ACT-03** | Sesiones de Autenticación (Cookies) | Datos de Tránsito | Tokens temporales que se guardan en los navegadores para mantener las identidades validadas de los apoderados. | **Confidencial** |
---

## 2. Identificación de Riesgos según la Industria Preescolar

Al manejar datos de alta sensibilidad (identidad y ubicación de menores de edad), los riesgos se definen bajo escenarios reales de impacto directo:

*   **Riesgo 1: Exfiltración masiva de datos de menores por debilidad en consultas (En sección SQLi)**  

    Alguien malintencionado puede aprovecha la falta de seguridad del formulario para descargar las direcciones y teléfonos de las familias, vulnerando la privacidad física de los menores.

*   **Riesgo 2: Secuestro de sesiones activas de los apoderados (En sección a XSS)**  

    Un atacante roba las cookies de sesión de un tutor escolar mediante enlaces maliciosos, permitiéndole entrar a la ficha del menor para ver bitácoras internas o alterar autorizaciones de retiro.

*   **Riesgo 3: Modificación o destrucción de archivos del servidor (En sección de Inyección de Comandos)**  

    Un ciberdelincuente ejecuta comandos directos en la consola del servidor con la capacidad de corromper fichas de matrícula o dar de baja el portal durante el periodo crítico de postulaciones.