## 1. Introducción y Contexto de la Empresa
El presente informe técnico detalla los hallazgos de la auditoría de seguridad realizada al portal web de **"EduKids Jardín Infantil"**, una institución de educación preescolar encargada del cuidado y formación de menores de edad. 

En este tipo de instituciones, su plataforma web es el canal principal donde se gestionan y guardan los **Datos de Menores y Apoderados**. 

## 2. El Desafío de la Seguridad en EduKids
Desde la perspectiva de la ciberseguridad, custodiar datos de menores de edad conlleva una responsabilidad moral, institucional y legal crítica. La filtración o el secuestro de esta información no solo daña la reputación del jardín infantil, sino que pone en riesgo directo la integridad y privacidad de niños en etapa preescolar. 

Para evaluar la resistencia del portal, se recreó el ambiente de la plataforma en un entorno controlado utilizando la herramienta DVWA (*Damn Vulnerable Web Application*) en su nivel de seguridad *Low* (Bajo), simulando un escenario donde el sitio carece de defensas perimetrales básicas. El objetivo es identificar vulnerabilidades antes de que puedan ser explotadas por atacantes reales, bajo el marco defensivo y legal chileno de la Ley 21.459.