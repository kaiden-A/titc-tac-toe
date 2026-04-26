"use client";

import { useEffect, useRef } from "react";

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animationFrame: number;

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      phase: number;
      big: boolean;
      driftX: number;
      driftY: number;
    }

    let stars: Star[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createStars() {
      stars = [];
      const count = Math.floor((canvas!.width * canvas!.height) / 10000) + 100;
      for (let i = 0; i < count; i++) {
        const big = i < Math.floor(count * 0.15);
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          radius: big ? Math.random() * 1.5 + 0.8 : Math.random() * 0.7 + 0.15,
          alpha: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
          phase: Math.random() * Math.PI * 2,
          big,
          driftX: (Math.random() - 0.5) * 0.03,
          driftY: (Math.random() - 0.5) * 0.03,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach((star) => {
        const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 * star.speed + star.phase);
        const alpha = star.alpha * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${alpha})`;
        ctx.fill();

        if (star.big) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,210,255,${alpha * 0.15})`;
          ctx.fill();
        }

        star.x += star.driftX;
        star.y += star.driftY + star.speed * 0.2;

        if (star.x < -10) star.x = canvas!.width + 10;
        if (star.x > canvas!.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas!.height + 10;
        if (star.y > canvas!.height + 10) star.y = -10;
      });

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    createStars();
    draw();

    const handleResize = () => {
      resize();
      createStars();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
