import { useEffect, useRef } from 'react'

const Effects = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Effet de réseau neuronal
    class Neuron {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      
      draw() {
        ctx.fillStyle = 'rgba(0, 247, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const neurons = Array(50).fill().map(() => new Neuron())

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Dessiner les connexions
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x
          const dy = neurons[i].y - neurons[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 247, 255, ${1 - distance/150})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(neurons[i].x, neurons[i].y)
            ctx.lineTo(neurons[j].x, neurons[j].y)
            ctx.stroke()
          }
        }
        
        neurons[i].update()
        neurons[i].draw()
      }
      
      requestAnimationFrame(animate)
    }
    
    animate()

    return () => cancelAnimationFrame(animate)
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30"
    />
  )
}

export default Effects