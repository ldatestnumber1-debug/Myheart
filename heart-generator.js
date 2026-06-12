// Heart made of stars
class StarHeart {
    constructor() {
        this.canvas = document.getElementById('heartCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.stars = [];
        this.rotation = 0;
        this.heartColor = '#ff1493';
        this.rotationSpeed = 0.5;
        this.pulseAmount = 1;
        this.time = 0;
        
        this.generateHeartStars();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    generateHeartStars() {
        this.stars = [];
        const heartPoints = this.getHeartShape();
        
        // Create stars along heart outline
        const density = 4; // Number of stars per segment
        
        for (let i = 0; i < heartPoints.length - 1; i++) {
            const p1 = heartPoints[i];
            const p2 = heartPoints[i + 1];
            
            for (let j = 0; j < density; j++) {
                const t = j / density;
                const x = p1.x + (p2.x - p1.x) * t;
                const y = p1.y + (p2.y - p1.y) * t;
                
                this.stars.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 2 + 1,
                    opacity: 0.6 + Math.random() * 0.4,
                    twinkle: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.05 + 0.02
                });
            }
        }
    }
    
    getHeartShape() {
        const points = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = 80;
        
        // Heart shape parametric equation
        for (let t = 0; t < Math.PI * 2; t += 0.05) {
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
        this.time += 0.01;
        
        const pulse = 1 + Math.sin(this.time * 2) * 0.1; // Pulsing effect
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw stars
        for (let star of this.stars) {
            // Apply rotation
            const angle = Math.atan2(star.baseY - centerY, star.baseX - centerX);
            const distance = Math.sqrt(
                Math.pow(star.baseX - centerX, 2) + 
                Math.pow(star.baseY - centerY, 2)
            );
            
            const newAngle = angle + this.rotation;
            star.x = centerX + Math.cos(newAngle) * distance * pulse;
            star.y = centerY + Math.sin(newAngle) * distance * pulse;
            
            // Twinkling effect
            star.twinkle += star.twinkleSpeed;
            const twinkleAlpha = star.opacity * (0.5 + 0.5 * Math.sin(star.twinkle));
            
            this.drawStar(star, twinkleAlpha);
        }
        
        this.rotation += this.rotationSpeed * 0.005;
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawStar(star, opacity) {
        const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
        
        gradient.addColorStop(0, this.adjustColor(this.heartColor, 1, opacity));
        gradient.addColorStop(0.5, this.adjustColor(this.heartColor, 0.6, opacity * 0.7));
        gradient.addColorStop(1, this.adjustColor(this.heartColor, 0.3, 0));
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Glow effect
        this.ctx.strokeStyle = this.adjustColor(this.heartColor, 1, opacity * 0.3);
        this.ctx.lineWidth = 1;
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
        this.generateHeartStars();
    }
}

// Initialize star heart
const starHeart = new StarHeart();