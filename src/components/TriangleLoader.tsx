import { useEffect, useRef, useState } from "react";

interface Triangle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
}

export const TriangleLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const trianglesRef = useRef<Triangle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animationRef = useRef<number>();

  const colors = [
    "hsl(199, 89%, 48%)",
    "hsl(217, 91%, 60%)",
    "hsl(186, 100%, 29%)",
    "hsl(25, 95%, 53%)",
    "hsl(340, 100%, 50%)",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    trianglesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 30 + 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "hsl(222, 47%, 11%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      trianglesRef.current.forEach((triangle) => {
        const dx = triangle.x - mouseRef.current.x;
        const dy = triangle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (distance < repelRadius) {
          const force = (repelRadius - distance) / repelRadius;
          triangle.vx += (dx / distance) * force * 0.5;
          triangle.vy += (dy / distance) * force * 0.5;
        }

        triangle.x += triangle.vx;
        triangle.y += triangle.vy;
        triangle.vx *= 0.98;
        triangle.vy *= 0.98;

        if (triangle.x < 0 || triangle.x > canvas.width) {
          triangle.vx *= -0.8;
          triangle.x = Math.max(0, Math.min(canvas.width, triangle.x));
        }
        if (triangle.y < 0 || triangle.y > canvas.height) {
          triangle.vy *= -0.8;
          triangle.y = Math.max(0, Math.min(canvas.height, triangle.y));
        }

        triangle.rotation += 0.01;

        ctx.save();
        ctx.translate(triangle.x, triangle.y);
        ctx.rotate(triangle.rotation);
        ctx.fillStyle = triangle.color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -triangle.size / 2);
        ctx.lineTo(triangle.size / 2, triangle.size / 2);
        ctx.lineTo(-triangle.size / 2, triangle.size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div className="relative z-10 text-center">
        <h2 className="mb-8 font-heading text-4xl font-bold text-foreground animate-pulse">
          Loading Experience...
        </h2>
        
        <div className="mx-auto w-80 h-2 bg-card rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: "var(--gradient-accent)",
              boxShadow: "var(--shadow-glow)",
            }}
          />
        </div>
        
        <p className="mt-4 text-lg text-muted-foreground">{progress}%</p>
      </div>
    </div>
  );
};
