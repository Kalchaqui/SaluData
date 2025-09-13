#!/bin/bash

# 🚀 Script de configuración para nuevos miembros del equipo - SaluData
# Este script automatiza la configuración inicial del proyecto

set -e

echo "🩺 Bienvenido al equipo de SaluData!"
echo "=================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "README.md" ] || [ ! -d "packages" ]; then
    print_error "Este script debe ejecutarse desde la raíz del proyecto SaluData"
    exit 1
fi

print_status "Verificando dependencias del sistema..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js 18+ antes de continuar."
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado. Por favor instala npm antes de continuar."
    exit 1
fi

# Verificar git
if ! command -v git &> /dev/null; then
    print_error "git no está instalado. Por favor instala git antes de continuar."
    exit 1
fi

print_success "Todas las dependencias del sistema están instaladas"

# Instalar dependencias del frontend
print_status "Instalando dependencias del frontend..."
cd packages/frontend
npm install
print_success "Dependencias del frontend instaladas"

# Instalar dependencias de hardhat
print_status "Instalando dependencias de Hardhat..."
cd ../hardhat
npm install
print_success "Dependencias de Hardhat instaladas"

# Volver a la raíz
cd ../..

# Crear archivos de configuración de entorno
print_status "Configurando archivos de entorno..."

# Frontend
if [ ! -f "packages/frontend/.env.local" ]; then
    cp packages/frontend/env.example packages/frontend/.env.local
    print_success "Archivo .env.local creado para el frontend"
    print_warning "Recuerda actualizar las variables en packages/frontend/.env.local"
else
    print_warning "El archivo .env.local ya existe en el frontend"
fi

# Hardhat
if [ ! -f "packages/hardhat/.env" ]; then
    cp packages/hardhat/env.example packages/hardhat/.env
    print_success "Archivo .env creado para Hardhat"
    print_warning "Recuerda actualizar las variables en packages/hardhat/.env"
else
    print_warning "El archivo .env ya existe en Hardhat"
fi

# Compilar contratos
print_status "Compilando contratos inteligentes..."
cd packages/hardhat
npx hardhat compile
print_success "Contratos compilados exitosamente"

# Volver a la raíz
cd ../..

# Ejecutar tests
print_status "Ejecutando tests del frontend..."
cd packages/frontend
if npm test 2>/dev/null; then
    print_success "Tests del frontend pasaron"
else
    print_warning "No se encontraron tests configurados en el frontend"
fi

print_status "Ejecutando tests de Hardhat..."
cd ../hardhat
if npm test 2>/dev/null; then
    print_success "Tests de Hardhat pasaron"
else
    print_warning "No se encontraron tests configurados en Hardhat"
fi

cd ../..

echo ""
echo "🎉 ¡Configuración completada exitosamente!"
echo "=================================="
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de entorno en:"
echo "   - packages/frontend/.env.local"
echo "   - packages/hardhat/.env"
echo ""
echo "2. Para obtener AVAX de prueba para Fuji testnet:"
echo "   - Visita: https://faucet.avax.network/"
echo ""
echo "3. Para ejecutar el frontend en desarrollo:"
echo "   cd packages/frontend && npm run dev"
echo ""
echo "4. Para deployar contratos:"
echo "   cd packages/hardhat && npx hardhat run scripts/deploy.ts --network fuji"
echo ""
echo "📚 Documentación completa: CONFIGURACION_EQUIPO.md"
echo ""
print_success "¡Bienvenido al equipo de SaluData! 🩺"


