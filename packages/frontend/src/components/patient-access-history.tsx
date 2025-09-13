'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { History, Eye, Clock, CheckCircle, XCircle, User } from 'lucide-react'

interface AccessHistoryEntry {
  id: string
  doctorAddress: string
  doctorName: string
  recordId: string
  recordName: string
  action: 'granted' | 'accessed' | 'revoked' | 'expired'
  timestamp: Date
  details?: string
}

export function PatientAccessHistory() {
  const [history, setHistory] = useState<AccessHistoryEntry[]>([])

  useEffect(() => {
    loadAccessHistory()
  }, [])

  const loadAccessHistory = () => {
    // Simular cargar historial de accesos
    setHistory([
      {
        id: '1',
        doctorAddress: '0x742d35Cc6634C0532925a3b8D9C6F1E0E1E1E1E1',
        doctorName: 'Dr. María González',
        recordId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        recordName: 'Exámenes de Laboratorio',
        action: 'granted',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: 'Consentimiento otorgado por 7 días'
      },
      {
        id: '2',
        doctorAddress: '0x852d35Cc6634C0532925a3b8D9C6F1E0E1E1E1E1',
        doctorName: 'Dr. Carlos López',
        recordId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        recordName: 'Radiografías',
        action: 'accessed',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        details: 'Acceso realizado a los archivos'
      },
      {
        id: '3',
        doctorAddress: '0x742d35Cc6634C0532925a3b8D9C6F1E0E1E1E1E1',
        doctorName: 'Dr. María González',
        recordId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        recordName: 'Exámenes de Laboratorio',
        action: 'revoked',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        details: 'Consentimiento revocado manualmente'
      },
      {
        id: '4',
        doctorAddress: '0x962d35Cc6634C0532925a3b8D9C6F1E0E1E1E1E1',
        doctorName: 'Dr. Ana Martínez',
        recordId: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        recordName: 'Historia Clínica',
        action: 'expired',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        details: 'Consentimiento expiró automáticamente'
      }
    ])
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'granted':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'accessed':
        return <Eye className="h-4 w-4 text-blue-600" />
      case 'revoked':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'expired':
        return <Clock className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getActionText = (action: string) => {
    switch (action) {
      case 'granted':
        return 'Consentimiento Otorgado'
      case 'accessed':
        return 'Acceso Realizado'
      case 'revoked':
        return 'Consentimiento Revocado'
      case 'expired':
        return 'Consentimiento Expirado'
      default:
        return 'Acción Desconocida'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'granted':
        return 'bg-green-100 text-green-800'
      case 'accessed':
        return 'bg-blue-100 text-blue-800'
      case 'revoked':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))

    if (days > 0) {
      return `Hace ${days} día${days > 1 ? 's' : ''}`
    } else if (hours > 0) {
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}`
    } else if (minutes > 0) {
      return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
    } else {
      return 'Hace unos momentos'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historial de Accesos
          </CardTitle>
          <CardDescription>
            Registro completo de todos los accesos a tus datos médicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No hay historial de accesos</p>
              <p className="text-sm">Los accesos a tus datos aparecerán aquí</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry) => (
                <Card key={entry.id} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getActionIcon(entry.action)}
                        <div>
                          <h4 className="font-medium">{getActionText(entry.action)}</h4>
                          <p className="text-sm text-gray-600">
                            {entry.doctorName} - {entry.recordName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(entry.action)}`}>
                          {getActionText(entry.action)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimestamp(entry.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Médico:</span></p>
                        <p className="font-mono text-xs">{entry.doctorAddress}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Registro:</span></p>
                        <p className="font-mono text-xs">{entry.recordId.substring(0, 30)}...</p>
                      </div>
                    </div>

                    {entry.details && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                        <span className="font-medium">Detalles:</span> {entry.details}
                      </div>
                    )}

                    <div className="mt-3 text-xs text-gray-500">
                      {entry.timestamp.toLocaleString()}
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
                  {history.filter(h => h.action === 'granted').length}
                </p>
                <p className="text-sm text-gray-600">Consentimientos Otorgados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {history.filter(h => h.action === 'accessed').length}
                </p>
                <p className="text-sm text-gray-600">Accesos Realizados</p>
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
                  {history.filter(h => h.action === 'revoked').length}
                </p>
                <p className="text-sm text-gray-600">Consentimientos Revocados</p>
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
                  {new Set(history.map(h => h.doctorAddress)).size}
                </p>
                <p className="text-sm text-gray-600">Médicos Únicos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

