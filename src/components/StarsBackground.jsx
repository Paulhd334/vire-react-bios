export default function StarsBackground() {
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {stars.map(star => (
        <div 
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  )
}