'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, Download, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

interface DoctorAccess {
  consentTokenId: string
  patientAddress: string
  patientName: string
  recordId: string
  recordName: string
  status: 'active' | 'expired' | 'revoked'
  expiresAt: Date
  cid: string
  encryptedDEK: string
}

export function DoctorAccessManager() {
  const { address } = useAccount()
  const [accesses, setAccesses] = useState<DoctorAccess[]>([])
  const [selectedAccess, setSelectedAccess] = useState<DoctorAccess | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Formulario para buscar acceso por token ID
  const [searchTokenId, setSearchTokenId] = useState('')

  const { refetch: fetchAccessDetails } = useReadContract({
    address: SALUDATA_CONTRACT_ADDRESS,
    abi: SALUDATA_ABI,
    functionName: 'getAccessDetails',
    args: searchTokenId ? [BigInt(searchTokenId)] : undefined,
    query: {
      enabled: false, // Solo se ejecuta manualmente
    }
  })

  useEffect(() => {
    loadDoctorAccesses()
  }, [address])

  const loadDoctorAccesses = () => {
    // Simular cargar accesos del médico
    setAccesses([
      {
        consentTokenId: '1',
        patientAddress: '0x1234567890123456789012345678901234567890',
        patientName: 'Ana García',
        recordId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        recordName: 'Exámenes de Laboratorio',
        status: 'active',
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
        encryptedDEK: 'encrypted_dek_for_doctor_1'
      },
      {
        consentTokenId: '2',
        patientAddress: '0x2345678901234567890123456789012345678901',
        patientName: 'Carlos Rodríguez',
        recordId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        recordName: 'Radiografías',
        status: 'expired',
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        cid: 'QmYoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
        encryptedDEK: 'encrypted_dek_for_doctor_2'
      }
    ])
  }

  const handleSearchAccess = async () => {
    if (!searchTokenId.trim()) return

    setIsLoading(true)
    try {
      const result = await fetchAccessDetails()
      if (result.data) {
        const [cid, encryptedDEK] = result.data
        // Crear un objeto de acceso temporal para mostrar
        const tempAccess: DoctorAccess = {
          consentTokenId: searchTokenId,
          patientAddress: 'Desconocido',
          patientName: 'Paciente',
          recordId: 'N/A',
          recordName: 'Registro',
          status: 'active',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          cid,
          encryptedDEK
        }
        setSelectedAccess(tempAccess)
      }
    } catch (error) {
      console.error('Error al buscar acceso:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'expired':
        return <Clock className="h-4 w-4 text-gray-600" />
      case 'revoked':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo'
      case 'expired':
        return 'Expirado'
      case 'revoked':
        return 'Revocado'
      default:
        return 'Desconocido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      case 'revoked':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAccessRecord = (access: DoctorAccess) => {
    // En una implementación real, aquí se descifraría la DEK y se accedería al archivo
    console.log('Accediendo a registro:', access)
    alert(`Accediendo a ${access.recordName} del paciente ${access.patientName}`)
  }

  return (
    <div className="space-y-6">
      {/* Búsqueda por token ID */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Buscar Acceso por Token ID
          </CardTitle>
          <CardDescription>
            Busca un consentimiento específico usando su token ID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchTokenId}
              onChange={(e) => setSearchTokenId(e.target.value)}
              placeholder="Ingresa el Token ID del consentimiento"
              disabled={isLoading}
            />
            <Button
              onClick={handleSearchAccess}
              disabled={!searchTokenId.trim() || isLoading}
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          {selectedAccess && (
            <Card className="border border-blue-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Resultado de la búsqueda</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAccess.status)}`}>
                    {getStatusText(selectedAccess.status)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Token ID:</span> {selectedAccess.consentTokenId}</p>
                  <p><span className="font-medium">Paciente:</span> {selectedAccess.patientName}</p>
                  <p><span className="font-medium">CID:</span> {selectedAccess.cid}</p>
                </div>
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() => handleAccessRecord(selectedAccess)}
                  disabled={selectedAccess.status !== 'active'}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Acceder al Registro
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Lista de accesos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mis Accesos Autorizados
          </CardTitle>
          <CardDescription>
            Registros médicos a los que tienes acceso autorizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accesses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No tienes accesos autorizados</p>
              <p className="text-sm">Los pacientes aparecerán aquí cuando te otorguen consentimiento</p>
            </div>
          ) : (
            <div className="space-y-4">
              {accesses.map((access) => (
                <Card key={access.consentTokenId} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(access.status)}
                        <div>
                          <h4 className="font-medium">{access.patientName}</h4>
                          <p className="text-sm text-gray-600">{access.recordName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(access.status)}`}>
                          {getStatusText(access.status)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Expira: {access.expiresAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p><span className="font-medium">Token ID:</span> {access.consentTokenId}</p>
                        <p><span className="font-medium">Paciente:</span> {access.patientAddress.substring(0, 20)}...</p>
                      </div>
                      <div>
                        <p><span className="font-medium">CID:</span> {access.cid}</p>
                        <p><span className="font-medium">Registro:</span> {access.recordId.substring(0, 20)}...</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAccessRecord(access)}
                        disabled={access.status !== 'active'}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Registro
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // Simular descarga
                          alert(`Descargando ${access.recordName}`)
                        }}
                        disabled={access.status !== 'active'}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

