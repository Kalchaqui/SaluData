'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Key, CheckCircle, AlertCircle, Loader2, Stethoscope } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

export function DoctorPublicKeyManager() {
  const { address } = useAccount()
  const [publicKey, setPublicKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { writeContractAsync } = useWriteContract()

  // Leer la clave pública actual del médico
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
    // Simulación de generación de par de claves para médico
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
            Gestión de Claves Públicas - Médico
          </CardTitle>
          <CardDescription>
            Registra tu clave pública para recibir datos médicos cifrados de pacientes
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

          {/* Información específica para médicos */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Stethoscope className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-2">Importante para Médicos</h4>
                <p className="text-sm text-green-800 mb-2">
                  Tu clave pública permite a los pacientes cifrar datos médicos específicamente para ti. 
                  Solo podrás descifrar la información que los pacientes envíen usando tu clave pública.
                </p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Los pacientes necesitan tu clave pública para otorgarte acceso</li>
                  <li>• Mantén tu clave privada segura y nunca la compartas</li>
                  <li>• Puedes actualizar tu clave pública en cualquier momento</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

