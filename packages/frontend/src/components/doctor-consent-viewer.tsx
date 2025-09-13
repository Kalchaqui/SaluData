'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Clock, CheckCircle, XCircle, User } from 'lucide-react'

interface ConsentInfo {
  id: string
  patientAddress: string
  patientName: string
  recordId: string
  recordName: string
  status: 'pending' | 'active' | 'revoked' | 'expired'
  grantedAt: Date
  expiresAt: Date
  duration: string
}

export function DoctorConsentViewer() {
  const [consents, setConsents] = useState<ConsentInfo[]>([])

  useEffect(() => {
    loadConsents()
  }, [])

  const loadConsents = () => {
    // Simular cargar consentimientos otorgados al médico
    setConsents([
      {
        id: '1',
        patientAddress: '0x1234567890123456789012345678901234567890',
        patientName: 'Ana García',
        recordId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        recordName: 'Exámenes de Laboratorio',
        status: 'active',
        grantedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        duration: '7 días'
      },
      {
        id: '2',
        patientAddress: '0x2345678901234567890123456789012345678901',
        patientName: 'Carlos Rodríguez',
        recordId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        recordName: 'Radiografías',
        status: 'expired',
        grantedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        duration: '7 días'
      },
      {
        id: '3',
        patientAddress: '0x3456789012345678901234567890123456789012',
        patientName: 'María López',
        recordId: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        recordName: 'Historia Clínica',
        status: 'revoked',
        grantedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        duration: '7 días'
      }
    ])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
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
      case 'active':
        return 'Activo'
      case 'pending':
        return 'Pendiente'
      case 'revoked':
        return 'Revocado'
      case 'expired':
        return 'Expirado'
      default:
        return 'Desconocido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'revoked':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expirado'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) {
      return `${days} día${days > 1 ? 's' : ''} restante${days > 1 ? 's' : ''}`
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''} restante${hours > 1 ? 's' : ''}`
    } else {
      return 'Expira pronto'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Consentimientos Recibidos
          </CardTitle>
          <CardDescription>
            Consentimientos que los pacientes te han otorgado para acceder a sus registros médicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {consents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No tienes consentimientos otorgados</p>
              <p className="text-sm">Los pacientes aparecerán aquí cuando te otorguen acceso</p>
            </div>
          ) : (
            <div className="space-y-4">
              {consents.map((consent) => (
                <Card key={consent.id} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(consent.status)}
                        <div>
                          <h4 className="font-medium">{consent.patientName}</h4>
                          <p className="text-sm text-gray-600">{consent.recordName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consent.status)}`}>
                          {getStatusText(consent.status)}
                        </span>
                        {consent.status === 'active' && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimeRemaining(consent.expiresAt)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p><span className="font-medium">Paciente:</span> {consent.patientAddress.substring(0, 20)}...</p>
                        <p><span className="font-medium">Registro:</span> {consent.recordId.substring(0, 20)}...</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Otorgado:</span> {consent.grantedAt.toLocaleDateString()}</p>
                        <p><span className="font-medium">Duración:</span> {consent.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        ID del Consentimiento: {consent.id}
                      </div>
                      {consent.status === 'active' && (
                        <div className="text-xs text-green-600 font-medium">
                          ✓ Acceso autorizado
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {consents.filter(c => c.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {consents.filter(c => c.status === 'expired').length}
                </p>
                <p className="text-sm text-gray-600">Expirados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {consents.filter(c => c.status === 'revoked').length}
                </p>
                <p className="text-sm text-gray-600">Revocados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(consents.map(c => c.patientAddress)).size}
                </p>
                <p className="text-sm text-gray-600">Pacientes Únicos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

