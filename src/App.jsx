import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import NextPage from './components/NextPage'  // Ton composant BIOS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/game" element={<NextPage />} />  {/* animation BIOS */}
        <Route path="/nextpage" element={<NextPage />} />  {/* tu peux mettre un autre composant si tu veux */}
      </Routes>
    </Router>
  )
}

export default App
