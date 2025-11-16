import { useState, useEffect } from 'react'
import { FiCamera, FiAlertTriangle, FiMail, FiPower, FiSettings, FiServer, FiThermometer, FiActivity, FiHardDrive } from 'react-icons/fi'

const Dashboard = () => {
  const [mailOpened, setMailOpened] = useState(false)
  const [activeTab, setActiveTab] = useState('surveillance')
  const [cameraBlink, setCameraBlink] = useState(false) // Clignotement spécifique aux caméras
  const [serverBlink, setServerBlink] = useState(false) // Clignotement spécifique au serveur

  // Effet de clignotement pour les alertes caméra
  useEffect(() => {
    const interval = setInterval(() => {
      setCameraBlink(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Effet de clignotement pour les alertes serveur (plus lent)
  useEffect(() => {
    const interval = setInterval(() => {
      setServerBlink(prev => !prev)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  // Caméras avec alerte
  const cameraFeeds = [
    {
      id: 1,
      name: "ENTRÉE PRINCIPALE",
      status: "alert",
      feedUrl: "https://placehold.co/600x400/000000/FF0000/png?text=ALERTE+INTRUSION",
      lastAlert: "INTRUSION DÉTECTÉE"
    },
    {
      id: 2,
      name: "PARKING SUD",
      status: "alert",
      feedUrl: "https://placehold.co/600x400/000000/FF0000/png?text=MOUVEMENT+SUSPECT",
      lastAlert: "MOUVEMENT ANORMAL"
    },
    {
      id: 3,
      name: "COULOIR RDC",
      status: "online",
      feedUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=VISION+NORMALE",
      lastAlert: "AUCUNE ALERTE"
    },
    {
      id: 4,
      name: "SALLE SERVEURS",
      status: "offline",
      feedUrl: null,
      lastAlert: "HORS LIGNE"
    }
  ]

  // Fonctionnalités serveur
  const [serverStatus, setServerStatus] = useState('online')
  const [tempMetrics, setTempMetrics] = useState({
    cpu: 87,
    gpu: 92,
    chassis: 45,
    drives: [38, 42, 56, 61]
  })

  useEffect(() => {
    const tempInterval = setInterval(() => {
      setTempMetrics(prev => ({
        cpu: Math.min(100, prev.cpu + (Math.random() > 0.7 ? 2 : -1)),
        gpu: Math.min(100, prev.gpu + (Math.random() > 0.7 ? 3 : -2)),
        chassis: 40 + Math.floor(Math.random() * 10),
        drives: prev.drives.map(t => Math.min(65, t + (Math.random() > 0.8 ? 1 : 0)))
      }))
    }, 3000)

    return () => clearInterval(tempInterval)
  }, [])

  const emergencyShutdown = () => {
    setServerStatus('shutting-down')
    setTimeout(() => setServerStatus('offline'), 2000)
  }

  const isCritical = tempMetrics.cpu > 85 || tempMetrics.gpu > 85 || tempMetrics.drives.some(t => t > 60)

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 flex flex-col">
      {/* Header avec effet néon */}
      <header className="flex justify-between items-center border-b border-red-900 pb-4 mb-6 relative">
        <div className="flex items-center space-x-4">
          <div className={`relative ${cameraBlink ? 'text-red-500' : 'text-red-700'} transition-all duration-300`}>
            <FiCamera className="text-3xl" />
            <div className={`absolute inset-0 rounded-full ${cameraBlink ? 'bg-red-500/30' : 'bg-transparent'} blur-md`}></div>
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
            SYSTÈME D'ALERTE
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${cameraBlink ? 'bg-red-500' : 'bg-red-900'} transition-all duration-500`}></div>
            <span className={`text-sm font-bold ${cameraBlink ? 'text-red-400' : 'text-red-800'} transition-all duration-500`}>
              ALERTE ACTIVE
            </span>
          </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${cameraBlink ? 'bg-red-500/50' : 'bg-transparent'} transition-all duration-300`}></div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 gap-6">
        {/* Sidebar */}
        <aside className="w-48 space-y-6">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('surveillance')}
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 border-l-4 ${activeTab === 'surveillance' ? 'border-red-500 bg-red-900/10 text-red-400' : 'border-transparent text-gray-500 hover:bg-gray-900'}`}
            >
              <FiCamera className={`${activeTab === 'surveillance' ? 'text-red-500' : 'text-gray-500'}`} />
              <span>SURVEILLANCE</span>
            </button>
            <button 
              onClick={() => setActiveTab('alerts')}
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 border-l-4 ${activeTab === 'alerts' ? 'border-red-500 bg-red-900/10 text-red-400' : 'border-transparent text-gray-500 hover:bg-gray-900'}`}
            >
              <FiAlertTriangle className={`${activeTab === 'alerts' ? 'text-red-500' : 'text-gray-500'}`} />
              <span>ALERTES</span>  
            </button>
            <button 
              onClick={() => setActiveTab('server')}
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 border-l-4 ${
                activeTab === 'server' ? 'border-red-500 bg-red-900/10 text-red-400' : 'border-transparent text-gray-500 hover:bg-gray-900'
              }`}
            >
              <FiServer className={`${activeTab === 'server' ? 'text-red-500' : 'text-gray-500'}`} />
              <span>SERVEUR</span>  
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden">
          {activeTab === 'surveillance' && (
            <div className="space-y-6 p-4">
              <h2 className="text-xl font-bold text-red-500 border-b border-red-900 pb-3 flex items-center">
                <FiAlertTriangle className="mr-2 animate-pulse" />
                SURVEILLANCE EN TEMPS RÉEL
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cameraFeeds.map(camera => (
                  <div 
                    key={camera.id} 
                    className={`border rounded-lg overflow-hidden transition-all duration-300 ${camera.status === 'alert' ? 
                      `${cameraBlink ? 'border-red-500 bg-red-900/20' : 'border-red-900 bg-red-900/10'}` : 
                      'border-gray-800 bg-gray-900'}`}
                  >
                    <div className={`p-3 flex justify-between items-center ${camera.status === 'alert' ? 'bg-red-900/50' : 'bg-black'}`}>
                      <h3 className={`font-bold ${camera.status === 'alert' ? 'text-red-400' : 'text-gray-400'}`}>
                        {camera.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${camera.status === 'alert' ? 
                          `${cameraBlink ? 'bg-red-600 text-white' : 'bg-red-900/80 text-red-300'}` : 
                          camera.status === 'online' ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-500'}`}
                        >
                          {camera.status === 'alert' ? 'ALERTE' : camera.status === 'online' ? 'EN LIGNE' : 'HORS LIGNE'}
                        </span>
                      </div>
                    </div>
                    
                    {camera.status !== 'offline' ? (
                      <div className="relative">
                        <img 
                          src={camera.feedUrl} 
                          alt={`Flux ${camera.name}`}
                          className="w-full h-64 object-cover"
                        />
                        <div className={`absolute bottom-0 left-0 right-0 p-3 ${camera.status === 'alert' ? 'bg-gradient-to-t from-red-900/80 to-transparent' : 'bg-gradient-to-t from-black to-transparent'}`}>
                          <p className={`text-xs font-bold ${camera.status === 'alert' ? 'text-red-300' : 'text-gray-400'}`}>
                            {camera.lastAlert}
                          </p>
                        </div>
                        {camera.status === 'alert' && (
                          <>
                            <div className={`absolute inset-0 ${cameraBlink ? 'bg-red-500/10' : 'bg-transparent'} transition-all duration-300`}></div>
                            <div className="absolute top-4 right-4">
                              <div className={`w-4 h-4 rounded-full ${cameraBlink ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-red-900'} transition-all duration-300`}></div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-950 flex items-center justify-center">
                        <div className="text-center">
                          <FiCamera className="mx-auto text-3xl text-gray-700 mb-2" />
                          <p className="text-gray-600 font-bold">CAMÉRA HORS LIGNE</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6 p-4">
              <h2 className="text-xl font-bold text-red-500 border-b border-red-900 pb-3">
                JOURNAL DES ALERTES
              </h2>
              <div className="space-y-3">
                {[
                  { 
                    id: 1, 
                    type: 'INTRUSION', 
                    location: 'ENTRÉE PRINCIPALE', 
                    time: '12:45:23', 
                    details: 'Mouvement détecté dans la zone sécurisée' 
                  },
                  { 
                    id: 2, 
                    type: 'MOUVEMENT SUSPECT', 
                    location: 'PARKING SUD', 
                    time: '11:30:12', 
                    details: 'Activité anormale détectée près du véhicule #204' 
                  },
                  { 
                    id: 3, 
                    type: 'ACCÈS NON AUTORISÉ', 
                    location: 'PORTE 204', 
                    time: '09:15:42', 
                    details: 'Tentative d\'accès avec badge invalide' 
                  }
                ].map(alert => (
                  <div 
                    key={alert.id} 
                    className={`p-4 border-l-4 rounded-r ${cameraBlink ? 'border-red-500 bg-red-900/30' : 'border-red-700 bg-red-900/20'} transition-all duration-500`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-red-400">{alert.type}</h3>
                        <p className="text-sm text-red-300">{alert.location}</p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${cameraBlink ? 'bg-red-500 text-white' : 'bg-red-900/50 text-red-300'}`}>
                        {alert.time}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-red-200">{alert.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'server' && (
            <div className="space-y-8 p-4">
              <h2 className="text-xl font-bold text-red-500 border-b border-red-900 pb-3 flex items-center">
                <FiServer className="mr-2" />
                MONITORING SERVEUR
              </h2>

              {/* Cartes de température */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* CPU */}
                <div className={`border rounded-lg p-4 ${
                  tempMetrics.cpu > 85 ? 
                    `${serverBlink ? 'border-red-500 bg-red-900/20' : 'border-red-800 bg-red-900/10'}` : 
                    'border-gray-700 bg-gray-800'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold flex items-center">
                      <FiActivity className="mr-2" />
                      CPU
                    </h3>
                    <span className={`text-xl font-mono font-bold ${
                      tempMetrics.cpu > 85 ? 'text-red-400' : 'text-gray-300'
                    }`}>
                      {tempMetrics.cpu}°C
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        tempMetrics.cpu > 85 ? 'bg-red-500' : 
                        tempMetrics.cpu > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${tempMetrics.cpu}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400 flex justify-between">
                    <span>0°C</span>
                    <span>{tempMetrics.cpu > 85 ? 'CRITIQUE' : tempMetrics.cpu > 70 ? 'ÉLEVÉ' : 'NORMAL'}</span>
                    <span>100°C</span>
                  </div>
                </div>

                {/* GPU */}
                <div className={`border rounded-lg p-4 ${
                  tempMetrics.gpu > 85 ? 
                    `${serverBlink ? 'border-red-500 bg-red-900/20' : 'border-red-800 bg-red-900/10'}` : 
                    'border-gray-700 bg-gray-800'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold flex items-center">
                      <FiActivity className="mr-2" />
                      GPU
                    </h3>
                    <span className={`text-xl font-mono font-bold ${
                      tempMetrics.gpu > 85 ? 'text-red-400' : 'text-gray-300'
                    }`}>
                      {tempMetrics.gpu}°C
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        tempMetrics.gpu > 85 ? 'bg-red-500' : 
                        tempMetrics.gpu > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${tempMetrics.gpu}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400 flex justify-between">
                    <span>0°C</span>
                    <span>{tempMetrics.gpu > 85 ? 'CRITIQUE' : tempMetrics.gpu > 70 ? 'ÉLEVÉ' : 'NORMAL'}</span>
                    <span>100°C</span>
                  </div>
                </div>

                {/* Chassis */}
                <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold flex items-center">
                      <FiThermometer className="mr-2" />
                      CHÂSSIS
                    </h3>
                    <span className="text-xl font-mono font-bold text-gray-300">
                      {tempMetrics.chassis}°C
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-blue-500" 
                      style={{ width: `${tempMetrics.chassis}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400 flex justify-between">
                    <span>0°C</span>
                    <span>NORMAL</span>
                    <span>100°C</span>
                  </div>
                </div>

                {/* Disques durs */}
                <div className={`border rounded-lg p-4 ${
                  tempMetrics.drives.some(t => t > 60) ? 
                    `${serverBlink ? 'border-red-500 bg-red-900/20' : 'border-red-800 bg-red-900/10'}` : 
                    'border-gray-700 bg-gray-800'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold flex items-center">
                      <FiHardDrive className="mr-2" />
                      STOCKAGE
                    </h3>
                    <span className={`text-xl font-mono font-bold ${
                      tempMetrics.drives.some(t => t > 60) ? 'text-red-400' : 'text-gray-300'
                    }`}>
                      {Math.max(...tempMetrics.drives)}°C
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {tempMetrics.drives.map((temp, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between mb-1">
                          <span>SSD {idx+1}</span>
                          <span className={`font-mono ${
                            temp > 60 ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {temp}°C
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              temp > 60 ? 'bg-red-500' : 'bg-gray-500'
                            }`} 
                            style={{ width: `${(temp/65)*100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bouton d'arrêt d'urgence */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={emergencyShutdown}
                  disabled={serverStatus !== 'online'}
                  className={`px-8 py-4 rounded-lg font-bold text-xl flex items-center space-x-3 transition-all ${
                    serverStatus === 'online' ? 
                      (isCritical ? 
                        `${serverBlink ? 'bg-red-600 shadow-lg shadow-red-500/50' : 'bg-red-800'}` : 
                        'bg-gray-800 hover:bg-gray-700') : 
                      'bg-gray-900 cursor-not-allowed'
                  }`}
                >
                  <FiPower className="text-2xl" />
                  <span>ARRÊT D'URGENCE</span>
                </button>
              </div>

              {/* Logs système */}
              <div className="mt-8 border border-gray-800 rounded-lg p-4 bg-gray-950">
                <h3 className="font-bold mb-3 text-gray-400">LOGS SYSTÈME</h3>
                <div className="font-mono text-xs space-y-1 h-40 overflow-y-auto">
                  {[
                    `[${new Date().toLocaleTimeString()}] Système en cours d'exécution`,
                    `[${new Date().toLocaleTimeString()}] Monitoring des températures actif`,
                    tempMetrics.cpu > 85 && `[${new Date().toLocaleTimeString()}] ALERTE: Température CPU critique (${tempMetrics.cpu}°C)`,
                    tempMetrics.gpu > 85 && `[${new Date().toLocaleTimeString()}] ALERTE: Température GPU critique (${tempMetrics.gpu}°C)`,
                    tempMetrics.drives.some(t => t > 60) && `[${new Date().toLocaleTimeString()}] ALERTE: Température disque élevée (${Math.max(...tempMetrics.drives)}°C)`,
                    serverStatus === 'shutting-down' && `[${new Date().toLocaleTimeString()}] Arrêt d'urgence initié...`,
                    serverStatus === 'offline' && `[${new Date().toLocaleTimeString()}] Système arrêté`
                  ].filter(Boolean).map((log, idx) => (
                    <p 
                      key={idx} 
                      className={`py-1 px-2 rounded ${
                        log.includes('ALERTE') ? 'bg-red-900/50 text-red-300' : 'text-gray-400'
                      }`}
                    >
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer avec effet néon */}
      <footer className={`mt-6 pt-4 border-t ${cameraBlink ? 'border-red-900' : 'border-red-950'} text-xs flex justify-between transition-all duration-500`}>
        <div className={`font-bold ${cameraBlink ? 'text-red-400' : 'text-red-800'}`}>SYSTÈME DE SURVEILLANCE ULTRA</div>
        <div className={`${cameraBlink ? 'text-red-300' : 'text-red-700'}`}>
          {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}
        </div>
      </footer>

      {/* Effets CSS supplémentaires */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        .animate-alert-pulse {
          animation: pulse 1s infinite;
        }
      `}</style>
    </div>
  )
}

export default Dashboard