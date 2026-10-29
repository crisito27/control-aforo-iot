# Control de Aforo IoT

Proyecto académico de control de aforo con Raspberry Pi, sensores, microservicios, Firestore y Vercel.

## Dataset de 7 días

La carpeta `data/` contiene un dataset para representar 7 días de operación del sistema de aforo. 



## Arquitectura

- Raspberry Pi 4.
- Sensor PIR.
- Sensor ultrasónico HC-SR04.
- Microservicios en Docker.
- MQTT con Mosquitto.
- Buffer local en SQLite.
- API HTTPS en Vercel.
- Cloud Firestore.
- Dashboard web en Next.js/Vercel.

## Seguridad del HC-SR04

El pin ECHO del HC-SR04 debe conectarse al GPIO mediante un divisor de voltaje con resistencias de 1 kΩ y 2 kΩ para reducir la señal de 5 V a un nivel seguro para la Raspberry Pi.

## Integración con Vercel

Equipo de Vercel comunicado por el grupo: https://vercel.com/new?teamSlug=trabajo-12cb

Esta dirección abre el asistente de importación de Vercel; **no es una URL pública de despliegue**. Para publicar la aplicación, importar este repositorio, establecer **Root Directory = web**, configurar las variables de entorno indicadas en `docs/FIREBASE_VERCEL.md` y verificar `/api/health` y el dashboard. No confirmar como completado el despliegue hasta obtener una URL `*.vercel.app` funcional.

**Integrantes:** Ignacio Cornejo y Cristian Pérez.

**Origen de los datos CSV:** dataset creado por software para ejercicios y validación de la lógica. Si el profesor acepta datos generados, pueden emplearse para el escenario académico, pero no son lecturas físicas de sensores ni métricas observadas en Vercel/Firebase.
