'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Shield, 
  Key, 
  Upload, 
  History, 
  UserPlus,
  Eye,
  ArrowLeft
} from 'lucide-react'
import { PatientPublicKeyManager } from './patient-public-key-manager'
import { PatientRecordManager } from './patient-record-manager'
import { PatientConsentManager } from './patient-consent-manager'
import { PatientFileUploader } from './patient-file-uploader'
import { PatientAccessHistory } from './patient-access-history'

interface PatientDashboardProps {
  onBack: () => void
}

export function PatientDashboard({ onBack }: PatientDashboardProps) {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState('records')

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Paciente</h1>
              <p className="text-gray-600">Gestiona tus registros médicos y controla el acceso</p>
            </div>
          </div>
        </div>
        
        {address && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">Wallet conectada:</p>
                  <p className="text-xs font-mono text-blue-700 break-all">{address}</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Mis Registros
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Subir Archivos
          </TabsTrigger>
          <TabsTrigger value="consent" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Consentimientos
          </TabsTrigger>
          <TabsTrigger value="keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Claves
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-6">
          <PatientRecordManager />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <PatientFileUploader />
        </TabsContent>

        <TabsContent value="consent" className="mt-6">
          <PatientConsentManager />
        </TabsContent>

        <TabsContent value="keys" className="mt-6">
          <PatientPublicKeyManager />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <PatientAccessHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

