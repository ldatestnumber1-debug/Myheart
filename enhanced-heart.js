// Enhanced Heart with massive particle effect and stronger glow
class EnhancedHeart {
    constructor() {
        this.canvas = document.getElementById('heartCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.particles = [];
        this.time = 0;
        this.heartColor = '#ff1493';
        this.rotation = 0;
        this.rotationSpeed = 0.5;
        
        this.generateHeartParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    generateHeartParticles() {
        this.particles = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const heartPoints = this.getHeartPoints();
        
        const density = 12;
        
        for (let i = 0; i < heartPoints.length - 1; i++) {
            const p1 = heartPoints[i];
            const p2 = heartPoints[i + 1];
            
            for (let j = 0; j < density; j++) {
                const t = j / density;
                const x = p1.x + (p2.x - p1.x) * t;
                const y = p1.y + (p2.y - p1.y) * t;
                
                this.particles.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 5 + 2,
                    opacity: 0.8 + Math.random() * 0.2,
                    twinkle: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.1 + 0.04,
                    layer: 'main'
                });
                
                for (let k = 0; k < 3; k++) {
                    const offsetAngle = Math.random() * Math.PI * 2;
                    const offsetDist = Math.random() * 30 + 15;
                    this.particles.push({
                        x: x + Math.cos(offsetAngle) * offsetDist,
                        y: y + Math.sin(offsetAngle) * offsetDist,
                        baseX: x + Math.cos(offsetAngle) * offsetDist,
                        baseY: y + Math.sin(offsetAngle) * offsetDist,
                        size: Math.random() * 2 + 0.5,
                        opacity: 0.5 + Math.random() * 0.3,
                        twinkle: Math.random() * Math.PI * 2,
                        twinkleSpeed: Math.random() * 0.08 + 0.02,
                        layer: 'glow'
                    });
                }
            }
        }
    }
    
    getHeartPoints() {
        const points = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = 140;
        
        for (let t = 0; t < Math.PI * 2; t += 0.02) {
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            
            points.push({
                x: centerX + x * scale,
                y: centerY - y * scale * 0.8
            });
        }
        
        return points;
    }
    
    animate() {
        this.clear();
        this.time += 0.015;
        
        const pulse = 1 + Math.sin(this.time * 1.2) * 0.15;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let particle of this.particles) {
            const angle = Math.atan2(particle.baseY - centerY, particle.baseX - centerX);
            const distance = Math.sqrt(
                Math.pow(particle.baseX - centerX, 2) + 
                Math.pow(particle.baseY - centerY, 2)
            );
            
            const newAngle = angle + this.rotation;
            particle.x = centerX + Math.cos(newAngle) * distance * pulse;
            particle.y = centerY + Math.sin(newAngle) * distance * pulse;
            
            particle.twinkle += particle.twinkleSpeed;
            const twinkleAlpha = particle.opacity * (0.3 + 0.7 * Math.sin(particle.twinkle));
            
            this.drawParticle(particle, twinkleAlpha);
        }
        
        this.rotation += this.rotationSpeed * 0.003;
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawParticle(particle, opacity) {
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
        );
        
        gradient.addColorStop(0, this.adjustColor(this.heartColor, 1, opacity));
        gradient.addColorStop(0.5, this.adjustColor(this.heartColor, 0.8, opacity * 0.7));
        gradient.addColorStop(1, this.adjustColor(this.heartColor, 0.3, 0));
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.globalAlpha = opacity * 0.6;
        this.ctx.strokeStyle = this.adjustColor(this.heartColor, 1, opacity);
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    adjustColor(hexColor, saturation = 1, alpha = 1) {
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    setHeartColor(color) {
        this.heartColor = color;
    }
    
    setRotationSpeed(speed) {
        this.rotationSpeed = speed;
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.generateHeartParticles();
    }
}

const enhancedHeart = new EnhancedHeart();