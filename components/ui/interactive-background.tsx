'use client'

import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const hexRadius = 45; // Size of hexagons
        const hexWidth = Math.sqrt(3) * hexRadius;
        const hexHeight = 2 * hexRadius;

        const mouse = {
            x: -1000,
            y: -1000,
            radius: 250, // Interaction radius
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        window.addEventListener('resize', resizeCanvas);

        const drawHexagon = (x: number, y: number, r: number, fillOpacity: number, strokeOpacity: number) => {
            if (!ctx) return;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 6;
                const hx = x + r * Math.cos(angle);
                const hy = y + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
            ctx.closePath();

            if (fillOpacity > 0) {
                // Create a gradient for the fill
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
                gradient.addColorStop(0, `rgba(96, 165, 250, ${fillOpacity})`); // Lighter blue center
                gradient.addColorStop(1, `rgba(37, 99, 235, ${fillOpacity * 0.5})`); // Darker blue edge
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            ctx.strokeStyle = `rgba(59, 130, 246, ${strokeOpacity})`; // Blue border
            ctx.lineWidth = 1.5;
            ctx.stroke();
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / hexWidth) + 1;
            const rows = Math.ceil(canvas.height / (hexHeight * 0.75)) + 1;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const isOddRow = row % 2 !== 0;
                    const x = col * hexWidth + (isOddRow ? hexWidth / 2 : 0);
                    const y = row * hexHeight * 0.75;

                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let currentRadius = hexRadius - 2; // Slight padding between hexes
                    let fillOpacity = 0;
                    let strokeOpacity = 0.08; // Base subtle grid

                    if (distance < mouse.radius) {
                        // Calculate a wave effect
                        const intensity = 1 - (distance / mouse.radius);

                        // Nodes shrink slightly and glow as mouse gets near
                        currentRadius = (hexRadius - 2) * (1 - intensity * 0.1);
                        fillOpacity = intensity * 0.4;
                        strokeOpacity = 0.08 + (intensity * 0.7);
                    }

                    drawHexagon(x, y, currentRadius, fillOpacity, strokeOpacity);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', () => { });
            window.removeEventListener('mouseout', () => { });
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 bg-slate-50"
        />
    );
};

export default InteractiveBackground;
