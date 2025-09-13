'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet-connect'
import { ProfileSelector } from '@/components/profile-selector'
import { PatientDashboard } from '@/components/patient-dashboard'
import { DoctorDashboard } from '@/components/doctor-dashboard'
import { Heart } from 'lucide-react'
import { useIsMounted } from '@/lib/use-is-mounted'

type Profile = 'patient' | 'doctor' | null

export default function Home() {
  const { isConnected } = useAccount()
  const [selectedProfile, setSelectedProfile] = useState<Profile>(null)
  const mounted = useIsMounted()

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const handleProfileSelect = (profile: 'patient' | 'doctor') => {
    setSelectedProfile(profile)
  }

  const handleBackToProfileSelection = () => {
    setSelectedProfile(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">SaluData</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma descentralizada para la gestión segura y privada de registros médicos
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center mb-8">
          <WalletConnect />
        </div>

        {/* Main Content */}
        {isConnected ? (
          <div>
            {!selectedProfile ? (
              <ProfileSelector onProfileSelect={handleProfileSelect} />
            ) : selectedProfile === 'patient' ? (
              <PatientDashboard onBack={handleBackToProfileSelection} />
            ) : (
              <DoctorDashboard onBack={handleBackToProfileSelection} />
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-12">
              <div className="mb-6">
                <Heart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Conecta tu Wallet
                </h2>
                <p className="text-gray-600">
                  Para usar SaluData, necesitas conectar tu wallet primero
                </p>
              </div>
              <p className="text-gray-600 mb-8">
                SaluData utiliza tecnología blockchain para garantizar la privacidad y seguridad 
                de tus datos médicos. Conecta tu wallet para comenzar.
              </p>
            </div>
          </div>
        )}

        {/* Features - Solo mostrar si no hay perfil seleccionado */}
        {isConnected && !selectedProfile && (
          <div className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Características de SaluData
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Privacidad Garantizada</h3>
                </div>
                <p className="text-gray-600">
                  Tus datos médicos están cifrados y solo tú controlas quién puede acceder a ellos.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Registros Inmutables</h3>
                </div>
                <p className="text-gray-600">
                  Los registros médicos se almacenan de forma inmutable en la blockchain.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Control Total</h3>
                </div>
                <p className="text-gray-600">
                  Otorga y revoca permisos de acceso a tus registros médicos cuando lo necesites.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}