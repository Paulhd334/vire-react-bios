import { useState } from 'react'
import { FaRocket, FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-space-dark bg-opacity-80 backdrop-blur-md border-b border-space-light">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaRocket className="text-space-neon text-2xl" />
            <span className="text-xl font-bold neon-text">BOLIV</span>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-space-neon transition">Accueil</a>
            <a href="#features" className="hover:text-space-neon transition">Features</a>
            <a href="#gallery" className="hover:text-space-neon transition">Galerie</a>
            <a href="#about" className="hover:text-space-neon transition">À propos</a>
          </div>
          
          {/* Bouton mobile */}
          <button 
            className="md:hidden text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <a href="#home" className="block hover:text-space-neon transition">Accueil</a>
            <a href="#features" className="block hover:text-space-neon transition">Features</a>
            <a href="#gallery" className="block hover:text-space-neon transition">Galerie</a>
            <a href="#about" className="block hover:text-space-neon transition">À propos</a>
          </div>
        )}
      </div>
    </nav>
  )
}