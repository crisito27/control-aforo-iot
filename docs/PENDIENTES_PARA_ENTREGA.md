# Pendientes para dejar el proyecto listo para evaluación

## Requieren configuración manual del grupo
1. Crear el proyecto Firebase.
2. Activar Firestore y Authentication (correo/contraseña).
3. Crear usuarios de prueba con roles ADMIN y VIEWER.
4. Crear la cuenta de servicio de Firebase y cargarla solo como variable de entorno en Vercel.
5. Importar la carpeta `web` en Vercel y configurar las variables de entorno.
6. Copiar `.env.example` a `.env` en la Raspberry y completar URL/token.
7. Conectar físicamente PIR y HC-SR04. El ECHO del HC-SR04 debe llevar divisor 1 kΩ / 2 kΩ.
8. Ejecutar `docker compose up -d --build` en la Raspberry y validar los contenedores.
9. Probar desconexión de Internet y reenvío desde SQLite.
10. Tomar capturas de Firebase/Vercel, Docker, dashboard y prueba de recuperación.
11. Completar el análisis de uso/capacidad y la comparación PaaS/IaaS con datos del escenario autorizado por el docente.

## Estado actual
El repositorio contiene la arquitectura base, 4 microservicios, MQTT, buffer SQLite, API Vercel, integración Firestore, dashboard inicial, históricos, alertas, configuración, login y documentación de despliegue.

## Importante
No subir al repositorio tokens, contraseñas ni el JSON de cuenta de servicio.
