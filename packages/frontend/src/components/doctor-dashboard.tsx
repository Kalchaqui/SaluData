'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Stethoscope, 
  Shield, 
  Key, 
  Eye, 
  History, 
  UserCheck,
  ArrowLeft
} from 'lucide-react'
import { DoctorPublicKeyManager } from './doctor-public-key-manager'
import { DoctorAccessManager } from './doctor-access-manager'
import { DoctorConsentViewer } from './doctor-consent-viewer'
import { DoctorAccessHistory } from './doctor-access-history'

interface DoctorDashboardProps {
  onBack: () => void
}

export function DoctorDashboard({ onBack }: DoctorDashboardProps) {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState('access')

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
            <div className="p-2 bg-green-100 rounded-lg">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Médico</h1>
              <p className="text-gray-600">Accede a registros médicos con consentimiento del paciente</p>
            </div>
          </div>
        </div>
        
        {address && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-900">Wallet conectada:</p>
                  <p className="text-xs font-mono text-green-700 break-all">{address}</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Mis Accesos
          </TabsTrigger>
          <TabsTrigger value="consents" className="flex items-center gap-2">
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

        <TabsContent value="access" className="mt-6">
          <DoctorAccessManager />
        </TabsContent>

        <TabsContent value="consents" className="mt-6">
          <DoctorConsentViewer />
        </TabsContent>

        <TabsContent value="keys" className="mt-6">
          <DoctorPublicKeyManager />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <DoctorAccessHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

