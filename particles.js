// Colorful particles with text
class TextParticles {
    constructor() {
        this.canvas = document.getElementById('particlesCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.particles = [];
        this.text = 'I LOVE YOU';
        this.time = 0;
        
        this.colors = [
            '#ff1493', // Deep Pink
            '#00ced1', // Dark Turquoise
            '#ff00ff', // Magenta
            '#00ffff', // Cyan
            '#ffb6ff', // Light Pink
            '#00ff88', // Spring Green
            '#ff6600', // Orange-Red
            '#6666ff', // Blue
            '#ffff00', // Yellow
            '#ff3366'  // Red-Pink
        ];
        
        this.generateParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    generateParticles() {
        this.particles = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 250;
        
        const charArray = this.text.split('');
        const particlesPerChar = 40;
        
        for (let charIndex = 0; charIndex < charArray.length; charIndex++) {
            for (let i = 0; i < particlesPerChar; i++) {
                const angle = (Math.random() * Math.PI * 2);
                const distance = Math.random() * radius + 150;
                
                this.particles.push({
                    x: centerX + Math.cos(angle) * distance,
                    y: centerY + Math.sin(angle) * distance,
                    baseX: centerX + Math.cos(angle) * distance,
                    baseY: centerY + Math.sin(angle) * distance,
                    char: charArray[charIndex],
                    charIndex: charIndex,
                    particleIndex: i,
                    angle: angle,
                    distance: distance,
                    baseDistance: distance,
                    color: this.colors[Math.floor(Math.random() * this.colors.length)],
                    size: Math.random() * 2 + 1,
                    opacity: 0.3 + Math.random() * 0.7,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.05
                });
            }
        }
    }
    
    animate() {
        this.clear();
        this.time += 0.01;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw particles
        for (let particle of this.particles) {
            // Orbital motion
            particle.angle += (this.time * 0.001) * (1 + particle.charIndex * 0.1);
            
            // Pulsing distance
            const pulse = 1 + Math.sin(this.time + particle.particleIndex) * 0.15;
            particle.distance = particle.baseDistance * pulse;
            
            // Update position
            particle.x = centerX + Math.cos(particle.angle) * particle.distance;
            particle.y = centerY + Math.sin(particle.angle) * particle.distance;
            
            // Rotation
            particle.rotation += particle.rotationSpeed;
            
            // Opacity variation
            const opacityVariation = 0.5 + 0.5 * Math.sin(this.time * 2 + particle.particleIndex);
            const finalOpacity = particle.opacity * opacityVariation;
            
            this.drawParticle(particle, finalOpacity);
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawParticle(particle, opacity) {
        this.ctx.save();
        
        // Draw dust particle
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 1.5
        );
        
        const rgbaColor = this.hexToRgba(particle.color, opacity);
        const rgbaColorFade = this.hexToRgba(particle.color, opacity * 0.3);
        
        gradient.addColorStop(0, rgbaColor);
        gradient.addColorStop(0.7, this.hexToRgba(particle.color, opacity * 0.6));
        gradient.addColorStop(1, rgbaColorFade);
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw glow
        this.ctx.strokeStyle = this.hexToRgba(particle.color, opacity * 0.5);
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
        
        // Draw character text near particle cluster center
        if (particle.particleIndex === 0) {
            this.drawCharacter(particle, opacity * 0.8);
        }
        
        this.ctx.restore();
    }
    
    drawCharacter(particle, opacity) {
        const charCenterRadius = 50;
        const charX = this.canvas.width / 2 + Math.cos(particle.angle) * charCenterRadius;
        const charY = this.canvas.height / 2 + Math.sin(particle.angle) * charCenterRadius;
        
        this.ctx.font = 'bold 28px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = this.hexToRgba(particle.color, opacity);
        this.ctx.shadowColor = this.hexToRgba(particle.color, opacity * 0.7);
        this.ctx.shadowBlur = 15;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        this.ctx.fillText(particle.char, charX, charY);
    }
    
    hexToRgba(hex, alpha) {
        const hexValue = hex.replace('#', '');
        const r = parseInt(hexValue.substring(0, 2), 16);
        const g = parseInt(hexValue.substring(2, 4), 16);
        const b = parseInt(hexValue.substring(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    setText(newText) {
        this.text = newText.toUpperCase();
        this.generateParticles();
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.generateParticles();
    }
}

// Initialize particles
const textParticles = new TextParticles();