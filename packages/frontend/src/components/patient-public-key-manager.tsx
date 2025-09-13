'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Key, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

export function PatientPublicKeyManager() {
  const { address } = useAccount()
  const [publicKey, setPublicKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { writeContractAsync } = useWriteContract()

  // Leer la clave pública actual del usuario
  const { data: currentPublicKey, refetch } = useReadContract({
    address: SALUDATA_CONTRACT_ADDRESS,
    abi: SALUDATA_ABI,
    functionName: 'publicEncryptionKeys',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  const handleRegisterPublicKey = async () => {
    if (!publicKey.trim()) {
      setStatus('error')
      return
    }

    setIsLoading(true)
    setStatus('idle')

    try {
      await writeContractAsync({
        address: SALUDATA_CONTRACT_ADDRESS,
        abi: SALUDATA_ABI,
        functionName: 'registerPublicKey',
        args: [publicKey],
      })

      setStatus('success')
      setPublicKey('')
      refetch() // Actualizar la clave pública mostrada
    } catch (error) {
      console.error('Error al registrar clave pública:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const generateKeyPair = () => {
    // Simulación de generación de par de claves
    // En producción, esto se haría con una librería de criptografía real
    const mockPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${Math.random().toString(36).substring(2, 15)}
-----END PUBLIC KEY-----`
    setPublicKey(mockPublicKey)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Gestión de Claves Públicas
          </CardTitle>
          <CardDescription>
            Registra tu clave pública para el cifrado de datos médicos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Clave pública actual */}
          {currentPublicKey && currentPublicKey !== '' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Clave pública registrada</span>
              </div>
              <p className="text-xs font-mono text-green-700 break-all">
                {currentPublicKey.substring(0, 50)}...
              </p>
            </div>
          )}

          {/* Formulario para registrar nueva clave */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="publicKey">Clave Pública</Label>
              <textarea
                id="publicKey"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Pega tu clave pública aquí..."
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-none"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleRegisterPublicKey}
                disabled={!publicKey.trim() || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  'Registrar Clave Pública'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={generateKeyPair}
                disabled={isLoading}
              >
                Generar Par de Claves
              </Button>
            </div>

            {/* Estado del registro */}
            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Clave pública registrada exitosamente
                </span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  Error al registrar la clave pública. Inténtalo de nuevo.
                </span>
              </div>
            )}
          </div>

          {/* Información sobre claves */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">¿Qué es una clave pública?</h4>
            <p className="text-sm text-blue-800">
              La clave pública se utiliza para cifrar datos que solo tú puedes descifrar con tu clave privada. 
              Esto garantiza que tus registros médicos estén protegidos y solo accesibles para ti.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

