import { useEffect, useState } from "react";

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  vx: number;
  vy: number;
}

const colors = [
  "hsl(270, 75%, 60%)",
  "hsl(195, 85%, 55%)",
  "hsl(310, 80%, 55%)",
  "hsl(270, 85%, 70%)",
  "hsl(195, 90%, 65%)",
];

export const TriangleLoader = () => {
  const [triangles, setTriangles] = useState<Triangle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize triangles
    const initialTriangles: Triangle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 30 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    setTriangles(initialTriangles);

    // Animation loop
    const interval = setInterval(() => {
      setTriangles((prev) =>
        prev.map((triangle) => {
          let newX = triangle.x + triangle.vx;
          let newY = triangle.y + triangle.vy;
          let newVx = triangle.vx;
          let newVy = triangle.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx *= -1;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVy *= -1;
            newY = Math.max(0, Math.min(window.innerHeight, newY));
          }

          return {
            ...triangle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: triangle.rotation + 1,
          };
        })
      );
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-background"
      onMouseMove={handleMouseMove}
    >
      <svg className="h-full w-full">
        {triangles.map((triangle) => {
          const dx = mousePos.x - triangle.x;
          const dy = mousePos.y - triangle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 100 - distance) / 100;
          const offsetX = -dx * repelForce * 0.5;
          const offsetY = -dy * repelForce * 0.5;

          return (
            <polygon
              key={triangle.id}
              points={`0,${-triangle.size} ${triangle.size * 0.866},${
                triangle.size * 0.5
              } ${-triangle.size * 0.866},${triangle.size * 0.5}`}
              fill={triangle.color}
              opacity="0.6"
              style={{
                transform: `translate(${triangle.x + offsetX}px, ${
                  triangle.y + offsetY
                }px) rotate(${triangle.rotation}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div
            className="mb-4 text-6xl font-black tracking-tight animate-pulse-glow"
            style={{
              background: "var(--gradient-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Loading
          </div>
          <div className="flex justify-center gap-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0s" }} />
            <div className="h-3 w-3 animate-bounce rounded-full bg-secondary" style={{ animationDelay: "0.2s" }} />
            <div className="h-3 w-3 animate-bounce rounded-full bg-accent" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
