'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function PatientFileUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setUploadStatus('idle')

    try {
      // Simular subida a IPFS
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Aquí se integraría con IPFS y el contrato SaluData
      // 1. Subir archivo a IPFS
      // 2. Obtener CID
      // 3. Calcular hash de metadatos
      // 4. Registrar en el contrato
      
      setUploadStatus('success')
      setFiles([])
    } catch (error) {
      console.error('Error al subir archivos:', error)
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return '📄'
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️'
      case 'doc':
      case 'docx':
        return '📝'
      default:
        return '📎'
    }
  }

  return (
    <div className="space-y-6">
      {/* Área de subida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Subir Archivos Médicos
          </CardTitle>
          <CardDescription>
            Sube tus archivos médicos de forma segura a IPFS y regístralos en la blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Zona de drop */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-500">
              Formatos soportados: PDF, JPG, PNG, DOC, DOCX (máx. 10MB por archivo)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />

          {/* Lista de archivos seleccionados */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Archivos seleccionados ({files.length})</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileIcon(file.name)}</span>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subiendo archivos...
                  </>
                ) : (
                  `Subir ${files.length} archivo${files.length > 1 ? 's' : ''}`
                )}
              </Button>
            </div>
          )}

          {/* Estado de la subida */}
          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">
                Archivos subidos exitosamente y registrados en la blockchain
              </span>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-800">
                Error al subir los archivos. Inténtalo de nuevo.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Información sobre la subida */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-medium text-gray-900 mb-3">¿Cómo funciona la subida segura?</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Los archivos se cifran localmente antes de la subida</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Se suben a IPFS (InterPlanetary File System) de forma descentralizada</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Se genera un hash único para verificar la integridad</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Se registra en la blockchain para trazabilidad inmutable</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

