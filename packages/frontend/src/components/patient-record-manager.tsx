'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Plus, Eye, Trash2, Loader2, AlertCircle } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

interface MedicalRecord {
  recordId: string
  cid: string
  metaHash: string
  owner: string
}

export function PatientRecordManager() {
  const { address } = useAccount()
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  // Formulario para nuevo registro
  const [newRecord, setNewRecord] = useState({
    recordId: '',
    cid: '',
    metaHash: ''
  })

  const { writeContractAsync } = useWriteContract()

  const handleRegisterRecord = async () => {
    if (!newRecord.recordId || !newRecord.cid) {
      setStatus('error')
      return
    }

    setIsLoading(true)
    setStatus('idle')

    try {
      // Convertir recordId a bytes32
      const recordIdBytes32 = '0x' + newRecord.recordId.padStart(64, '0')
      
      await writeContractAsync({
        address: SALUDATA_CONTRACT_ADDRESS,
        abi: SALUDATA_ABI,
        functionName: 'registerRecord',
        args: [recordIdBytes32, newRecord.cid, newRecord.metaHash],
      })

      setStatus('success')
      setNewRecord({ recordId: '', cid: '', metaHash: '' })
      loadRecords()
    } catch (error) {
      console.error('Error al registrar registro médico:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const loadRecords = async () => {
    // En una implementación real, aquí cargarías los registros desde el contrato
    // Por ahora, simulamos algunos registros
    setRecords([
      {
        recordId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
        metaHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        owner: address || ''
      },
      {
        recordId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        cid: 'QmYoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
        metaHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        owner: address || ''
      }
    ])
  }

  useEffect(() => {
    if (address) {
      loadRecords()
    }
  }, [address])

  const generateRecordId = () => {
    const randomId = Math.random().toString(16).substring(2, 18)
    setNewRecord(prev => ({ ...prev, recordId: randomId }))
  }

  return (
    <div className="space-y-6">
      {/* Formulario para nuevo registro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Registrar Nuevo Archivo Médico
          </CardTitle>
          <CardDescription>
            Registra un nuevo archivo médico en la blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recordId">ID del Registro</Label>
              <div className="flex gap-2">
                <Input
                  id="recordId"
                  value={newRecord.recordId}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, recordId: e.target.value }))}
                  placeholder="ID único del registro"
                  disabled={isLoading}
                />
                <Button
                  variant="outline"
                  onClick={generateRecordId}
                  disabled={isLoading}
                >
                  Generar
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="cid">CID (IPFS)</Label>
              <Input
                id="cid"
                value={newRecord.cid}
                onChange={(e) => setNewRecord(prev => ({ ...prev, cid: e.target.value }))}
                placeholder="QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="metaHash">Hash de Metadatos</Label>
            <Input
              id="metaHash"
              value={newRecord.metaHash}
              onChange={(e) => setNewRecord(prev => ({ ...prev, metaHash: e.target.value }))}
              placeholder="Hash de los metadatos del archivo"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleRegisterRecord}
            disabled={!newRecord.recordId || !newRecord.cid || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              'Registrar Archivo Médico'
            )}
          </Button>

          {/* Estado del registro */}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">
                Archivo médico registrado exitosamente
              </span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-800">
                Error al registrar el archivo médico. Inténtalo de nuevo.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de registros médicos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mis Registros Médicos
          </CardTitle>
          <CardDescription>
            Lista de todos tus registros médicos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No tienes registros médicos registrados</p>
              <p className="text-sm">Usa el formulario de arriba para registrar tu primer archivo médico</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Registro #{index + 1}</span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">ID:</span> {record.recordId.substring(0, 20)}...</p>
                          <p><span className="font-medium">CID:</span> {record.cid}</p>
                          <p><span className="font-medium">Hash:</span> {record.metaHash.substring(0, 20)}...</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

