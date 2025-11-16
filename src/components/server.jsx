import { useState, useEffect } from 'react'
import { FiServer, FiAlertTriangle, FiPower, FiThermometer, FiActivity, FiHardDrive } from 'react-icons/fi'

const ServerDashboard = () => {
  const [activeTab, setActiveTab] = useState('serveur')
  const [blink, setBlink] = useState(false)
  const [serverStatus, setServerStatus] = useState('online')
  const [tempMetrics, setTempMetrics] = useState({
    cpu: 87,
    gpu: 92,
    chassis: 45,
    drives: [38, 42, 56, 61]
  })

  // Effet de clignotement et simulation température
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink(prev => !prev), 600)
    const tempInterval = setInterval(() => {
      setTempMetrics(prev => ({
        cpu: Math.min(100, prev.cpu + (Math.random() > 0.7 ? 2 : -1)),
        gpu: Math.min(100, prev.gpu + (Math.random() > 0.7 ? 3 : -2)),
        chassis: 40 + Math.floor(Math.random() * 10),
        drives: prev.drives.map(t => Math.min(65, t + (Math.random() > 0.8 ? 1 : 0))) // Parenthèse fermante ajoutée ici
      }))
    }, 3000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(tempInterval)
    }
  }, [])

  // Arrêt d'urgence du serveur
  const emergencyShutdown = () => {
    setServerStatus('shutting-down')
    setTimeout(() => setServerStatus('offline'), 2000)
  }

  // ... reste du code ...

  // Vérification des seuils critiques
  const isCritical = tempMetrics.cpu > 85 || tempMetrics.gpu > 85 || tempMetrics.drives.some(t => t > 60)

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-red-900 pb-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className={`relative ${isCritical && blink ? 'text-red-500' : 'text-gray-400'}`}>
            <FiServer className="text-3xl" />
            {isCritical && <div className="absolute inset-0 rounded-full bg-red-500/30 blur-md"></div>}
          </div>
          <h1 className={`text-2xl font-bold ${isCritical ? 'text-red-500' : 'text-gray-300'}`}>
            SERVER CONTROL PANEL
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              serverStatus === 'online' ? 
                (isCritical ? (blink ? 'bg-red-500' : 'bg-red-900') : 'bg-green-500') : 
              serverStatus === 'shutting-down' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}></div>
            <span className={`text-sm font-bold ${
              serverStatus === 'online' ? 
                (isCritical ? (blink ? 'text-red-400' : 'text-red-700') : 'text-green-400') : 
              serverStatus === 'shutting-down' ? 'text-yellow-400' : 'text-gray-500'
            }`}>
              {serverStatus === 'online' ? 'EN LIGNE' : 
               serverStatus === 'shutting-down' ? 'ARRÊT EN COURS' : 'HORS LIGNE'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 gap-6">
        {/* Sidebar */}
        <aside className="w-48 space-y-6">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('serveur')}
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 border-l-4 ${
                activeTab === 'serveur' ? 'border-red-500 bg-red-900/10 text-red-400' : 'border-transparent text-gray-500 hover:bg-gray-900'
              }`}
            >
              <FiServer />
              <span>SERVEUR</span>
            </button>
            <button 
              onClick={() => setActiveTab('alertes')}
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 border-l-4 ${
                activeTab === 'alertes' ? 'border-red-500 bg-red-900/10 text-red-400' : 'border-transparent text-gray-500 hover:bg-gray-900'
              }`}
            >
              <FiAlertTriangle />
              <span>ALERTES</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden p-6">
          {activeTab === 'serveur' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold border-b border-gray-800 pb-3 flex items-center">
                <FiServer className="mr-2" />
                STATUT DU SERVEUR
              </h2>

              {/* Cartes de température */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* CPU */}
                <div className={`border rounded-lg p-4 ${
                  tempMetrics.cpu > 85 ? 
                    `${blink ? 'border-red-500 bg-red-900/20' : 'border-red-800 bg-red-900/10'}` : 
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
                    `${blink ? 'border-red-500 bg-red-900/20' : 'border-red-800 bg-red-900/10'}` : 
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
                    `${blink ? 'border-red-500 bg-red-900/20' : 'border-red-800 bg-red-900/10'}` : 
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
                        `${blink ? 'bg-red-600 shadow-lg shadow-red-500/50' : 'bg-red-800'}` : 
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

          {activeTab === 'alertes' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b border-gray-800 pb-3">
                <FiAlertTriangle className="inline mr-2" />
                ALERTES ACTIVES
              </h2>
              
              <div className="space-y-3">
                {[
                  tempMetrics.cpu > 85 && {
                    id: 1,
                    type: 'CPU SURCHAUFFE',
                    level: 'CRITIQUE',
                    message: `La température du CPU a atteint ${tempMetrics.cpu}°C`,
                    action: 'Vérifier le refroidissement immédiatement'
                  },
                  tempMetrics.gpu > 85 && {
                    id: 2,
                    type: 'GPU SURCHAUFFE',
                    level: 'CRITIQUE',
                    message: `La température du GPU a atteint ${tempMetrics.gpu}°C`,
                    action: 'Réduire la charge de travail'
                  },
                  tempMetrics.drives.some(t => t > 60) && {
                    id: 3,
                    type: 'DISQUE CHAUD',
                    level: 'AVERTISSEMENT',
                    message: `Un disque atteint ${Math.max(...tempMetrics.drives)}°C`,
                    action: 'Vérifier le flux d\'air'
                  }
                ].filter(Boolean).map(alert => (
                  <div 
                    key={alert.id} 
                    className={`border-l-4 p-4 rounded-r ${
                      alert.level === 'CRITIQUE' ? 
                        `${blink ? 'border-red-500 bg-red-900/30' : 'border-red-700 bg-red-900/20'}` : 
                        'border-yellow-500 bg-yellow-900/10'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">
                          {alert.type}
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${
                            alert.level === 'CRITIQUE' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                          }`}>
                            {alert.level}
                          </span>
                        </h3>
                        <p className="text-sm mt-1">{alert.message}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-800">
                      <p className="text-xs font-bold text-gray-300">ACTION REQUISE:</p>
                      <p className="text-sm">{alert.action}</p>
                    </div>
                  </div>
                ))}

                {tempMetrics.cpu <= 85 && tempMetrics.gpu <= 85 && tempMetrics.drives.every(t => t <= 60) && (
                  <div className="text-center py-8 text-gray-500">
                    <FiAlertTriangle className="inline-block text-3xl mb-2" />
                    <p>Aucune alerte active</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
        <div>SERVER CONTROL PANEL v3.2.1</div>
        <div>{new Date().toLocaleString()}</div>
      </footer>
    </div>
  )
}

export default ServerDashboard