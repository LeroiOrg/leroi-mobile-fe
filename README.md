# Leroi Mobile

Bienvenido a Leroi Mobile, la aplicación móvil oficial de la plataforma Leroi. Este proyecto está construido con React Native y Expo, permitiendo un desarrollo rápido y multiplataforma para Android e iOS a partir de una única base de código.

## Descripción General

Leroi es una plataforma de aprendizaje diseñada para optimizar el estudio. La aplicación móvil permite a los usuarios:

- Convertir documentos en rutas de aprendizaje personalizadas.
- Gestionar y seguir su progreso en diferentes temas.
- Acceder a sus planes de estudio desde cualquier lugar.

## Primeros Pasos

Para poner en marcha el entorno de desarrollo local, sigue estos pasos:

### 1. Instalar Dependencias

Asegúrate de tener Node.js instalado. Luego, desde la raíz del proyecto, instala todas las dependencias necesarias con npm:

```bash
npm install
```

### 2. Iniciar la Aplicación

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo de Metro:

```bash
npx expo start
```

Esto abrirá una terminal interactiva. Desde aquí, puedes elegir ejecutar la aplicación en:

- **Un emulador de Android:** Presiona `a`.
- **Un simulador de iOS:** Presiona `i` (requiere macOS y Xcode).
- **Tu propio dispositivo físico:** Escanea el código QR con la aplicación Expo Go.

## Estructura de Carpetas

El proyecto sigue una estructura simple y organizada:

- **/app**: Contiene todas las pantallas y rutas de la aplicación. Este proyecto utiliza el enrutamiento basado en archivos de Expo Router. Cada archivo `.tsx` dentro de esta carpeta se convierte en una ruta en la aplicación.
    - **/(tabs)**: Es un grupo de rutas para la navegación principal por pestañas.
    - **_layout.tsx**: Define el layout o plantilla principal de una sección.

- **/assets**: Contiene todos los archivos estáticos como imágenes, fuentes y otros recursos multimedia.
    - **/images**: Para archivos de imagen como PNG, JPG y GIF.

- **/components**: (Opcional, recomendado) Carpeta para alojar componentes de React reutilizables (botones, tarjetas, etc.) que se usan en varias pantallas.

## Scripts Disponibles

- `npm run android`: Inicia la aplicación en un emulador de Android o un dispositivo conectado.
- `npm run ios`: Inicia la aplicación en un simulador de iOS o un dispositivo conectado.
- `npm run web`: Inicia la aplicación en un navegador web (para pruebas).

## Aprende Más

Para aprender más sobre las tecnologías utilizadas en este proyecto, consulta los siguientes recursos:

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/docs/getting-started)
- [Enrutamiento con Expo Router](https://docs.expo.dev/router/introduction/)
