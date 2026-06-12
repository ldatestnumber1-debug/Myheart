// Enhanced Galaxy Background with more vibrant colors
class GalaxyBackground {
    constructor() {
        this.canvas = document.getElementById('galaxyCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.nebulae = [];
        this.stars = [];
        this.time = 0;
        
        this.initNebulae();
        this.initStars();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    initNebulae() {
        const nebulaeCount = 200;
        
        for (let i = 0; i < nebulaeCount; i++) {
            this.nebulae.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 200 + 80,
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.08,
                hue: Math.random() * 100 + 180, // Blue to purple range
                alpha: Math.random() * 0.35 + 0.05,
                baseAlpha: Math.random() * 0.35 + 0.05,
                pulseSpeed: Math.random() * 0.03 + 0.01
            });
        }
    }
    
    initStars() {
        const starCount = 500;
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                brightness: Math.random() * 0.6 + 0.4,
                twinkleSpeed: Math.random() * 0.05 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
                color: ['#ffffff', '#ffb6ff', '#00ffff', '#ff6699'][Math.floor(Math.random() * 4)]
            });
        }
    }
    
    animate() {
        this.clear();
        this.time += 0.0003;
        
        // Draw stars first
        for (let star of this.stars) {
            star.twinklePhase += star.twinkleSpeed;
            const twinkleBrightness = star.brightness * (0.6 + 0.4 * Math.sin(star.twinklePhase));
            this.drawStar(star, twinkleBrightness);
        }
        
        // Draw nebulae
        for (let nebula of this.nebulae) {
            nebula.x += nebula.vx;
            nebula.y += nebula.vy;
            
            if (nebula.x < -nebula.radius) nebula.x = this.canvas.width + nebula.radius;
            if (nebula.x > this.canvas.width + nebula.radius) nebula.x = -nebula.radius;
            if (nebula.y < -nebula.radius) nebula.y = this.canvas.height + nebula.radius;
            if (nebula.y > this.canvas.height + nebula.radius) nebula.y = -nebula.radius;
            
            nebula.alpha = nebula.baseAlpha + Math.sin(this.time * nebula.pulseSpeed) * 0.15;
            this.drawNebula(nebula);
        }
        
        // Draw overall glow
        this.drawOverallGlow();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawStar(star, brightness) {
        this.ctx.fillStyle = star.color;
        this.ctx.globalAlpha = brightness;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Star glow
        const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.globalAlpha = brightness * 0.3;
        this.ctx.fillRect(star.x - star.size * 3, star.y - star.size * 3, star.size * 6, star.size * 6);
    }
    
    drawNebula(nebula) {
        const gradient = this.ctx.createRadialGradient(
            nebula.x, nebula.y, 0,
            nebula.x, nebula.y, nebula.radius
        );
        
        gradient.addColorStop(0, `hsla(${nebula.hue}, 100%, 55%, ${nebula.alpha * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${nebula.hue + 40}, 100%, 40%, ${nebula.alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${nebula.hue + 80}, 100%, 25%, 0)`);
        
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(
            nebula.x - nebula.radius,
            nebula.y - nebula.radius,
            nebula.radius * 2,
            nebula.radius * 2
        );
    }
    
    drawOverallGlow() {
        const glowGradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, 
            Math.max(this.canvas.width, this.canvas.height) / 1.2
        );
        
        glowGradient.addColorStop(0, `rgba(138, 43, 226, ${0.08 + Math.sin(this.time * 3) * 0.03})`);
        glowGradient.addColorStop(0.5, `rgba(75, 0, 130, ${0.04 + Math.sin(this.time * 3) * 0.02})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = glowGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    clear() {
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

const galaxyBackground = new GalaxyBackground();