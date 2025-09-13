'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, UserPlus, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

interface ConsentRequest {
  id: string
  doctorAddress: string
  doctorName: string
  recordId: string
  recordName: string
  status: 'pending' | 'active' | 'revoked' | 'expired'
  expiresAt: Date
  createdAt: Date
}

export function PatientConsentManager() {
  const { address } = useAccount()
  const [consentRequests, setConsentRequests] = useState<ConsentRequest[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Formulario para otorgar consentimiento
  const [newConsent, setNewConsent] = useState({
    recordId: '',
    doctorAddress: '',
    duration: '7' // días
  })

  const { writeContractAsync } = useWriteContract()

  useEffect(() => {
    loadConsentRequests()
  }, [address])

  const loadConsentRequests = () => {
    // Simular cargar solicitudes de consentimiento
    setConsentRequests([
      {
        id: '1',
        doctorAddress: '0x742d35Cc6634C0532925a3b8D9C6F1E0E1E1E1E1',
        doctorName: 'Dr. María González',
        recordId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        recordName: 'Exámenes de Laboratorio',
        status: 'pending',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date()
      },
      {
        id: '2',
        doctorAddress: '0x852d35Cc6634C0532925a3b8D9C6F1E0E1E1E1E1',
        doctorName: 'Dr. Carlos López',
        recordId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        recordName: 'Radiografías',
        status: 'active',
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      }
    ])
  }

  const handleGrantConsent = async (request: ConsentRequest) => {
    setIsLoading(true)
    setStatus('idle')

    try {
      // En una implementación real, aquí se cifraría la DEK con la clave pública del doctor
      const mockEncryptedDEK = `encrypted_dek_for_${request.doctorAddress}`
      const durationSeconds = parseInt(newConsent.duration) * 24 * 60 * 60 // convertir días a segundos

      await writeContractAsync({
        address: SALUDATA_CONTRACT_ADDRESS,
        abi: SALUDATA_ABI,
        functionName: 'grantConsent',
        args: [
          request.recordId,
          request.doctorAddress,
          mockEncryptedDEK,
          durationSeconds
        ],
      })

      // Actualizar estado local
      setConsentRequests(prev => 
        prev.map(req => 
          req.id === request.id 
            ? { ...req, status: 'active' as const }
            : req
        )
      )

      setStatus('success')
    } catch (error) {
      console.error('Error al otorgar consentimiento:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeConsent = async (consentTokenId: string) => {
    setIsLoading(true)
    setStatus('idle')

    try {
      await writeContractAsync({
        address: SALUDATA_CONTRACT_ADDRESS,
        abi: SALUDATA_ABI,
        functionName: 'revokeConsent',
        args: [consentTokenId],
      })

      // Actualizar estado local
      setConsentRequests(prev => 
        prev.map(req => 
          req.id === consentTokenId 
            ? { ...req, status: 'revoked' as const }
            : req
        )
      )

      setStatus('success')
    } catch (error) {
      console.error('Error al revocar consentimiento:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'revoked':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'expired':
        return <Clock className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente'
      case 'active':
        return 'Activo'
      case 'revoked':
        return 'Revocado'
      case 'expired':
        return 'Expirado'
      default:
        return 'Desconocido'
    }
  }

  return (
    <div className="space-y-6">
      {/* Formulario para otorgar consentimiento manual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Otorgar Consentimiento
          </CardTitle>
          <CardDescription>
            Otorga acceso a un médico específico para tus registros médicos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recordId">ID del Registro</Label>
              <Input
                id="recordId"
                value={newConsent.recordId}
                onChange={(e) => setNewConsent(prev => ({ ...prev, recordId: e.target.value }))}
                placeholder="0x1234567890abcdef..."
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="doctorAddress">Dirección del Médico</Label>
              <Input
                id="doctorAddress"
                value={newConsent.doctorAddress}
                onChange={(e) => setNewConsent(prev => ({ ...prev, doctorAddress: e.target.value }))}
                placeholder="0x742d35Cc6634C0532925a3b8D9C6F1E0E1E1E1E1"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duración (días)</Label>
            <Input
              id="duration"
              type="number"
              value={newConsent.duration}
              onChange={(e) => setNewConsent(prev => ({ ...prev, duration: e.target.value }))}
              min="1"
              max="365"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={() => {
              // Crear una solicitud temporal para el formulario
              const tempRequest: ConsentRequest = {
                id: 'temp',
                doctorAddress: newConsent.doctorAddress,
                doctorName: 'Médico',
                recordId: newConsent.recordId,
                recordName: 'Registro',
                status: 'pending',
                expiresAt: new Date(Date.now() + parseInt(newConsent.duration) * 24 * 60 * 60 * 1000),
                createdAt: new Date()
              }
              handleGrantConsent(tempRequest)
            }}
            disabled={!newConsent.recordId || !newConsent.doctorAddress || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Otorgando consentimiento...
              </>
            ) : (
              'Otorgar Consentimiento'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Lista de consentimientos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Mis Consentimientos
          </CardTitle>
          <CardDescription>
            Gestiona los accesos otorgados a tus registros médicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {consentRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No tienes consentimientos otorgados</p>
              <p className="text-sm">Los médicos aparecerán aquí cuando soliciten acceso</p>
            </div>
          ) : (
            <div className="space-y-4">
              {consentRequests.map((request) => (
                <Card key={request.id} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(request.status)}
                        <div>
                          <h4 className="font-medium">{request.doctorName}</h4>
                          <p className="text-sm text-gray-600">{request.recordName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'active' ? 'bg-green-100 text-green-800' :
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'revoked' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getStatusText(request.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p><span className="font-medium">Médico:</span> {request.doctorAddress.substring(0, 20)}...</p>
                        <p><span className="font-medium">Registro:</span> {request.recordId.substring(0, 20)}...</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Expira:</span> {request.expiresAt.toLocaleDateString()}</p>
                        <p><span className="font-medium">Creado:</span> {request.createdAt.toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {request.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleGrantConsent(request)}
                          disabled={isLoading}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Aprobar
                        </Button>
                      )}
                      {request.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRevokeConsent(request.id)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Revocar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estado de las operaciones */}
      {status === 'success' && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800">
            Operación realizada exitosamente
          </span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <XCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-800">
            Error al realizar la operación. Inténtalo de nuevo.
          </span>
        </div>
      )}
    </div>
  )
}

