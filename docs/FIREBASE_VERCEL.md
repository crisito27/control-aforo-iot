# Configuración Firebase y Vercel

## Firebase
1. Crear un proyecto Firebase.
2. Activar Cloud Firestore.
3. Activar Authentication con correo/contraseña.
4. Crear dos usuarios de prueba: administrador y visor.
5. Crear una cuenta de servicio y guardar su JSON únicamente como variable de entorno en Vercel.

## Variables de entorno en Vercel
- FIREBASE_SERVICE_ACCOUNT_JSON
- DEVICE_TOKEN
- ADMIN_API_SECRET
- NEXT_PUBLIC_BASE_URL
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID

No subir claves reales al repositorio.

## Despliegue
1. Importar el repositorio en Vercel.
2. Elegir la carpeta `web` como Root Directory.
3. Agregar las variables anteriores.
4. Desplegar.
5. Probar `/api/health`.
6. Configurar en la Raspberry `API_BASE_URL=https://TU-DOMINIO.vercel.app/api`.

## Firestore
El endpoint `POST /api/events` guarda eventos en:
`organizations/default/events/{eventId}`

y actualiza:
`organizations/default/devices/{deviceId}`

El endpoint usa el mismo `eventId` como identificador para evitar duplicados en reintentos.
