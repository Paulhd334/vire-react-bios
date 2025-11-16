import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const BIOS_LINES = [
  'NEXA BIOS v2.5.3 - UEFI Firmware',
  'CPU: Quantum X9 8.4GHz (64 cores)',
  'GPU: Nebula RTX 9090 (48GB HBM4)',
  'Initializing neural network...',
  'System integrity: 100%',
  'Starting hypervisor...',
  'Bienvenue, User.',
]

const TYPE_SPEED = 20
const LINE_PAUSE = 300
const CURSOR_BLINK = 600

const Dashboard = () => {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  const navigate = useNavigate()

  // ------------------------------------
  // CURSEUR QUI CLIGNOTE
  // ------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, CURSOR_BLINK)

    return () => clearInterval(interval)
  }, [])

  // ------------------------------------
  // MACHINE À ÉCRIRE
  // ------------------------------------
  useEffect(() => {
    if (lineIndex >= BIOS_LINES.length) return

    const currentLine = BIOS_LINES[lineIndex]

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + currentLine[charIndex])
        setCharIndex(i => i + 1)
      }, TYPE_SPEED)

      return () => clearTimeout(timeout)
    }

    // Ligne terminée
    const pause = setTimeout(() => {
      setDisplayedLines(prev => [...prev, currentLine])
      setCurrentText('')
      setLineIndex(i => i + 1)
      setCharIndex(0)
    }, LINE_PAUSE)

    return () => clearTimeout(pause)
  }, [lineIndex, charIndex])

  // ------------------------------------
  // REDIRECTION APRÈS LA FIN
  // ------------------------------------
  useEffect(() => {
    if (lineIndex < BIOS_LINES.length) return

    const redirect = setTimeout(() => {
      navigate('/nextpage')
    }, 2000)

    return () => clearTimeout(redirect)
  }, [lineIndex, navigate])

  return (
    <div className="bios-screen">
      <div className="bios-container">
        <div className="bios-header">
          <div className="bios-logo">NEXA</div>
          <div className="bios-version">UEFI BIOS v2.5.3</div>
        </div>

        <div className="bios-content">
          {displayedLines.map((line, i) => (
            <div key={i} className="bios-line">
              <span className="bios-prompt">></span> {line}
            </div>
          ))}

          {lineIndex < BIOS_LINES.length && (
            <div className="bios-line">
              <span className="bios-prompt">></span> {currentText}
              <span className={`bios-cursor ${cursorVisible ? 'visible' : ''}`} />
            </div>
          )}
        </div>

        {lineIndex >= BIOS_LINES.length && (
          <div className="bios-footer">
            <div className="bios-progress-bar">
              <div className="bios-progress" />
            </div>
            <div className="bios-status">SYSTEM READY</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
