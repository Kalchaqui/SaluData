'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Stethoscope, ArrowRight, Heart } from 'lucide-react'

interface ProfileSelectorProps {
  onProfileSelect: (profile: 'patient' | 'doctor') => void
}

export function ProfileSelector({ onProfileSelect }: ProfileSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">SaluData</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Selecciona tu perfil para acceder a las funcionalidades correspondientes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Perfil Paciente */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
          onClick={() => onProfileSelect('patient')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-blue-600">PACIENTE</CardTitle>
            <CardDescription className="text-lg">
              Gestiona tus registros médicos y controla el acceso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Funcionalidades:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Subir y gestionar archivos médicos</li>
                <li>• Otorgar consentimientos a médicos</li>
                <li>• Revocar accesos cuando sea necesario</li>
                <li>• Ver historial de accesos</li>
                <li>• Gestionar claves de encriptación</li>
              </ul>
            </div>
            <Button className="w-full mt-6" onClick={() => onProfileSelect('patient')}>
              Acceder como Paciente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Perfil Médico */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
          onClick={() => onProfileSelect('doctor')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
              <Stethoscope className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">MÉDICO</CardTitle>
            <CardDescription className="text-lg">
              Accede a registros médicos con consentimiento del paciente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Funcionalidades:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Solicitar acceso a registros médicos</li>
                <li>• Ver consentimientos otorgados</li>
                <li>• Acceder a archivos médicos autorizados</li>
                <li>• Gestionar claves de encriptación</li>
                <li>• Ver historial de accesos</li>
              </ul>
            </div>
            <Button className="w-full mt-6" variant="outline" onClick={() => onProfileSelect('doctor')}>
              Acceder como Médico
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              ¿Cómo funciona la seguridad en SaluData?
            </h3>
            <p className="text-sm text-gray-600">
              Los pacientes mantienen control total sobre sus datos médicos. Los médicos solo pueden 
              acceder a la información con el consentimiento explícito del paciente, y este puede 
              revocar el acceso en cualquier momento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

