# Control de Aforo IoT

Proyecto académico de control de aforo con Raspberry Pi, sensores, microservicios, Firestore y Vercel.

## Dataset de 7 días

La carpeta `data/` contiene un dataset generado para representar 7 días de operación del sistema de aforo. Según la indicación posterior del docente comunicada por el grupo, este tipo de dataset puede utilizarse para la evaluación y desarrollo del proyecto.

Importante: el dataset fue generado por software y no corresponde a lecturas físicas capturadas directamente por los sensores. Se conserva esta trazabilidad para que la documentación técnica describa correctamente el origen de los datos.

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
