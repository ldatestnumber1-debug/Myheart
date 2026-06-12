// Enhanced Galaxy with vibrant colors and supernova effects
class EnhancedGalaxy {
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
        const nebulaeCount = 300;
        
        for (let i = 0; i < nebulaeCount; i++) {
            this.nebulae.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 300 + 100,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                hue: Math.random() * 360,
                alpha: Math.random() * 0.4 + 0.05,
                baseAlpha: Math.random() * 0.4 + 0.05,
                pulseSpeed: Math.random() * 0.04 + 0.01
            });
        }
    }
    
    initStars() {
        const starCount = 800;
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.3,
                brightness: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.08 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
                color: ['#ffffff', '#ffb6ff', '#00ffff', '#ffff99', '#ff99cc', '#99ccff'][Math.floor(Math.random() * 6)]
            });
        }
    }
    
    animate() {
        this.clear();
        this.time += 0.0002;
        
        for (let star of this.stars) {
            star.twinklePhase += star.twinkleSpeed;
            const twinkleBrightness = star.brightness * (0.5 + 0.5 * Math.sin(star.twinklePhase));
            this.drawStar(star, twinkleBrightness);
        }
        
        for (let nebula of this.nebulae) {
            nebula.x += nebula.vx;
            nebula.y += nebula.vy;
            
            if (nebula.x < -nebula.radius) nebula.x = this.canvas.width + nebula.radius;
            if (nebula.x > this.canvas.width + nebula.radius) nebula.x = -nebula.radius;
            if (nebula.y < -nebula.radius) nebula.y = this.canvas.height + nebula.radius;
            if (nebula.y > this.canvas.height + nebula.radius) nebula.y = -nebula.radius;
            
            nebula.alpha = nebula.baseAlpha + Math.sin(this.time * nebula.pulseSpeed) * 0.2;
            this.drawNebula(nebula);
        }
        
        this.drawOverallGlow();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawStar(star, brightness) {
        this.ctx.fillStyle = star.color;
        this.ctx.globalAlpha = brightness;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.globalAlpha = brightness * 0.4;
        this.ctx.fillRect(star.x - star.size * 4, star.y - star.size * 4, star.size * 8, star.size * 8);
    }
    
    drawNebula(nebula) {
        const gradient = this.ctx.createRadialGradient(
            nebula.x, nebula.y, 0,
            nebula.x, nebula.y, nebula.radius
        );
        
        gradient.addColorStop(0, `hsla(${nebula.hue}, 100%, 60%, ${nebula.alpha * 0.9})`);
        gradient.addColorStop(0.4, `hsla(${nebula.hue + 30}, 100%, 45%, ${nebula.alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${nebula.hue + 60}, 100%, 25%, 0)`);
        
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
            Math.max(this.canvas.width, this.canvas.height) / 1.1
        );
        
        glowGradient.addColorStop(0, `rgba(138, 43, 226, ${0.1 + Math.sin(this.time * 2) * 0.04})`);
        glowGradient.addColorStop(0.5, `rgba(75, 0, 130, ${0.05 + Math.sin(this.time * 2) * 0.02})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = glowGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    clear() {
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

const enhancedGalaxy = new EnhancedGalaxy();