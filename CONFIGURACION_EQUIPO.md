# 🔐 Configuración de Credenciales para el Equipo - SaluData

## 📋 Información General

Este documento contiene las instrucciones necesarias para que los nuevos miembros del equipo configuren el proyecto SaluData correctamente.

## 🚀 Configuración Inicial

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd SaluData
```

### 2. Instalar Dependencias

#### Frontend
```bash
cd packages/frontend
npm install
```

#### Hardhat (Backend/Contratos)
```bash
cd packages/hardhat
npm install
```

## 🔑 Configuración de Variables de Entorno

### Frontend (.env.local)
Copia el archivo `packages/frontend/env.example` a `packages/frontend/.env.local` y configura:

```bash
# Dirección del contrato SaluData (se proporcionará después del deploy)
NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS=0x...

# ID del proyecto de WalletConnect (opcional para desarrollo)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Red por defecto
NEXT_PUBLIC_DEFAULT_CHAIN=localhost
```

### Hardhat (.env)
Copia el archivo `packages/hardhat/env.example` a `packages/hardhat/.env` y configura:

```bash
# URL del RPC de Fuji (Avalanche Testnet)
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc

# Clave privada de wallet para deploy (SIN el prefijo 0x)
PRIVATE_KEY=your_private_key_here

# API Keys (opcional)
AVALANCHE_API_KEY=your_avalanche_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## 🔐 Credenciales Requeridas

### 1. Wallet Privada
- **Propósito**: Para hacer deploy de contratos y transacciones de prueba
- **Red recomendada**: Fuji (Avalanche Testnet)
- **Fondos necesarios**: AVAX de testnet (gratuito)
- **Cómo obtener**: Usar un faucet de AVAX testnet

### 2. WalletConnect Project ID (Opcional)
- **Propósito**: Para conectar wallets en la aplicación
- **Cómo obtener**: 
  1. Visitar [WalletConnect Cloud](https://cloud.walletconnect.com/)
  2. Crear un proyecto
  3. Copiar el Project ID

### 3. API Keys (Opcional)
- **Avalanche API Key**: Para verificar contratos en Fuji
- **Etherscan API Key**: Para verificar contratos en otras redes

## 🛠️ Comandos Útiles

### Desarrollo Frontend
```bash
cd packages/frontend
npm run dev
```

### Desarrollo Hardhat
```bash
cd packages/hardhat
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts --network fuji
```

### Verificar Contrato
```bash
npx hardhat verify --network fuji <contract_address> <constructor_args>
```

## 🌐 Redes Configuradas

### Fuji (Avalanche Testnet)
- **Chain ID**: 43113
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Explorer**: https://testnet.snowtrace.io/

### Localhost (Desarrollo)
- **Chain ID**: 31337
- **RPC URL**: http://127.0.0.1:8545

## 📝 Checklist para Nuevos Miembros

- [ ] Clonar el repositorio
- [ ] Instalar dependencias (frontend y hardhat)
- [ ] Configurar variables de entorno
- [ ] Crear wallet de prueba con fondos AVAX
- [ ] Configurar WalletConnect (opcional)
- [ ] Ejecutar tests: `npm run test` en ambos paquetes
- [ ] Compilar contratos: `npx hardhat compile`
- [ ] Ejecutar frontend: `npm run dev`

## 🚨 Seguridad

### ⚠️ IMPORTANTE
- **NUNCA** commites archivos `.env` o `.env.local`
- **NUNCA** compartas claves privadas reales
- **SÍEMPRE** usa wallets de prueba para desarrollo
- **VERIFICA** que los archivos `.env*` estén en `.gitignore`

### 🔒 Archivos Sensibles
Los siguientes archivos NO deben ser commiteados:
- `.env`
- `.env.local`
- `*.key`
- `*.pem`
- Archivos con claves privadas

## 🆘 Soporte

Si tienes problemas con la configuración:
1. Revisa que todas las variables de entorno estén configuradas
2. Verifica que las dependencias estén instaladas correctamente
3. Consulta la documentación de Hardhat y Next.js
4. Contacta al equipo de desarrollo

## 📚 Recursos Adicionales

- [Documentación de Hardhat](https://hardhat.org/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Wagmi](https://wagmi.sh/)
- [Avalanche Fuji Faucet](https://faucet.avax.network/)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)


