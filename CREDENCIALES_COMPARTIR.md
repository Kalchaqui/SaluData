# 🔐 Credenciales para Compartir con el Equipo

## 📋 Lista de Credenciales Necesarias

### 1. 🔑 Wallet Privada (Testnet)
**Propósito**: Para hacer deploy de contratos y transacciones de prueba
- **Red**: Fuji (Avalanche Testnet)
- **Fondos**: AVAX de testnet (gratuito desde faucet)
- **Formato**: Clave privada sin prefijo 0x
- **Ubicación en código**: `packages/hardhat/.env` → `PRIVATE_KEY`

### 2. 🌐 WalletConnect Project ID
**Propósito**: Para conectar wallets en la aplicación frontend
- **Opcional**: Para desarrollo local
- **Ubicación en código**: `packages/frontend/.env.local` → `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- **Cómo obtener**: [WalletConnect Cloud](https://cloud.walletconnect.com/)

### 3. 📡 API Keys (Opcionales)
**Propósito**: Para verificación de contratos

#### Avalanche API Key
- **Para**: Verificar contratos en Fuji testnet
- **Ubicación**: `packages/hardhat/.env` → `AVALANCHE_API_KEY`
- **Cómo obtener**: [Snowtrace API](https://docs.snowtrace.io/snowtrace-api)

#### Etherscan API Key
- **Para**: Verificar contratos en otras redes
- **Ubicación**: `packages/hardhat/.env` → `ETHERSCAN_API_KEY`
- **Cómo obtener**: [Etherscan API](https://etherscan.io/apis)

### 4. 🏠 Dirección del Contrato
**Propósito**: Para que el frontend se conecte al contrato correcto
- **Ubicación**: `packages/frontend/.env.local` → `NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS`
- **Valor actual**: `0x070018089b50cdac6b25bdb60b7c71a829c29f10`

## 🔒 Métodos Seguros para Compartir

### ✅ Métodos Recomendados
1. **Password Manager del Equipo** (1Password, Bitwarden, etc.)
2. **Chat encriptado** (Signal, Telegram con modo secreto)
3. **Canal privado de Slack/Discord** con permisos limitados
4. **Email encriptado** (PGP)

### ❌ Métodos NO Recomendados
- Email sin encriptar
- Chat público
- Documentos compartidos sin protección
- Mensajes de texto

## 📝 Plantilla de Mensaje para Compartir

```
🔐 Credenciales SaluData - [FECHA]

Hola equipo,

Aquí están las credenciales necesarias para configurar el proyecto SaluData:

🔑 WALLET PRIVADA (TESTNET):
- PRIVATE_KEY: [clave_privada_sin_0x]
- Red: Fuji (Avalanche Testnet)
- Fondos: Obtener desde https://faucet.avax.network/

🌐 WALLETCONNECT (Opcional):
- PROJECT_ID: [project_id]

📡 API KEYS (Opcionales):
- AVALANCHE_API_KEY: [api_key]
- ETHERSCAN_API_KEY: [api_key]

🏠 CONTRATO ACTUAL:
- ADDRESS: 0x070018089b50cdac6b25bdb60b7c71a829c29f10

📋 INSTRUCCIONES:
1. Ver CONFIGURACION_EQUIPO.md para setup completo
2. Ejecutar: ./scripts/setup-new-member.sh
3. Configurar variables en .env files

⚠️ IMPORTANTE: 
- Solo usar para desarrollo/testnet
- No compartir estas credenciales públicamente
- Rotar si hay sospecha de compromiso

Saludos,
[Tu nombre]
```

## 🔄 Rotación de Credenciales

### Cuándo Rotar
- Al agregar/remover miembros del equipo
- Si hay sospecha de compromiso
- Periódicamente (cada 3-6 meses)
- Al cambiar de testnet a mainnet

### Cómo Rotar
1. Generar nuevas credenciales
2. Actualizar variables de entorno
3. Comunicar cambios al equipo
4. Verificar que todos tienen acceso

## 🛡️ Mejores Prácticas

### Para el Administrador
- Mantener backup de credenciales en lugar seguro
- Documentar quién tiene acceso
- Establecer política de rotación
- Usar diferentes wallets para diferentes propósitos

### Para los Miembros del Equipo
- No compartir credenciales con terceros
- Usar solo para desarrollo oficial
- Reportar cualquier sospecha de compromiso
- Mantener actualizado el acceso

## 🆘 Contacto de Emergencia

En caso de compromiso de credenciales:
1. **Inmediatamente**: Rotar todas las credenciales afectadas
2. **Notificar**: Al equipo y administrador
3. **Documentar**: Qué credenciales fueron comprometidas
4. **Auditar**: Accesos y transacciones recientes

---

**Última actualización**: $(date)
**Responsable**: [Nombre del administrador]


