// Nebula Background Animation
class NebulaBackground {
    constructor() {
        this.canvas = document.getElementById('nebulaCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.particles = [];
        this.time = 0;
        
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    initParticles() {
        // Create nebula cloud particles
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 150 + 50,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                hue: Math.random() * 60 + 200, // Purple to blue range
                alpha: Math.random() * 0.3 + 0.1,
                baseAlpha: Math.random() * 0.3 + 0.1
            });
        }
    }
    
    animate() {
        this.clear();
        this.time += 0.0005;
        
        // Draw nebula clouds
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around
            if (particle.x < -particle.radius) particle.x = this.canvas.width + particle.radius;
            if (particle.x > this.canvas.width + particle.radius) particle.x = -particle.radius;
            if (particle.y < -particle.radius) particle.y = this.canvas.height + particle.radius;
            if (particle.y > this.canvas.height + particle.radius) particle.y = -particle.radius;
            
            // Pulsing alpha based on time
            particle.alpha = particle.baseAlpha + 
                            Math.sin(this.time * 2 + particle.hue) * 0.15;
            
            this.drawNebula(particle);
        }
        
        // Add overall glow effect
        this.addGlowEffect();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawNebula(particle) {
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius
        );
        
        // Color gradient - purple to magenta to blue
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.alpha * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue + 30}, 100%, 45%, ${particle.alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${particle.hue + 60}, 100%, 30%, 0)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(
            particle.x - particle.radius,
            particle.y - particle.radius,
            particle.radius * 2,
            particle.radius * 2
        );
    }
    
    addGlowEffect() {
        // Add overall nebula glow
        const glowGradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 1.5
        );
        
        glowGradient.addColorStop(0, `rgba(138, 43, 226, ${0.05 + Math.sin(this.time * 2) * 0.02})`);
        glowGradient.addColorStop(0.5, `rgba(75, 0, 130, ${0.02 + Math.sin(this.time * 2) * 0.01})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    clear() {
        // Clear with fade effect instead of complete clear
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

// Initialize nebula background
const nebulaBackground = new NebulaBackground();