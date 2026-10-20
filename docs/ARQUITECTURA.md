# Arquitectura

PIR y HC-SR04 -> microservicios de adquisición -> Mosquitto MQTT -> occupancy-service -> sync-service -> API HTTPS en Vercel -> Cloud Firestore -> dashboard.

## Microservicios
- pir-service: lectura del PIR.
- ultrasonic-service: medición de distancia HC-SR04.
- occupancy-service: combina eventos y estima ENTRY/EXIT.
- sync-service: buffer SQLite y sincronización HTTPS.

## Seguridad
La Raspberry no almacena credenciales administrativas de Firebase. Solo usa un token de dispositivo para autenticarse ante la API.

## Nota de hardware
El pin ECHO del HC-SR04 debe conectarse mediante divisor de voltaje 1 kΩ / 2 kΩ antes del GPIO de la Raspberry.
