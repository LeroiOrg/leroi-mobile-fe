#!/bin/bash

# Script para compilar APK con variables de entorno
# Uso: ./build-apk.sh [development|preview|production]

PROFILE=${1:-production}

echo "🚀 Compilando APK para perfil: $PROFILE"
echo ""

# Verificar que .env existe
if [ ! -f .env ]; then
    echo "❌ Error: Archivo .env no encontrado"
    echo "💡 Copia .env.example a .env y configura tus variables"
    exit 1
fi

# Cargar variables de .env
export $(cat .env | grep -v '^#' | xargs)

# Verificar variables críticas
if [ -z "$EXPO_PUBLIC_BACKEND_URL" ]; then
    echo "❌ Error: EXPO_PUBLIC_BACKEND_URL no está configurada"
    exit 1
fi

if [ -z "$EXPO_PUBLIC_FIREBASE_API_KEY" ]; then
    echo "❌ Error: EXPO_PUBLIC_FIREBASE_API_KEY no está configurada"
    exit 1
fi

echo "✅ Variables de entorno cargadas:"
echo "  - Backend URL: $EXPO_PUBLIC_BACKEND_URL"
echo "  - Firebase Project: $EXPO_PUBLIC_PROJECT_ID"
echo ""

# Ejecutar build
echo "📦 Iniciando build con EAS..."
eas build -p android --profile $PROFILE --clear-cache

echo ""
echo "✅ Build completado"
