// Cosmic Effects - Supernovas, comets, cosmic rays
class CosmicEffects {
    constructor() {
        this.canvas = document.getElementById('cosmicEffectsCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.supernovas = [];
        this.comets = [];
        this.time = 0;
        
        this.initSupernovas();
        this.initComets();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    initSupernovas() {
        for (let i = 0; i < 3; i++) {
            this.supernovas.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                maxRadius: Math.random() * 150 + 100,
                currentRadius: 0,
                duration: Math.random() * 3 + 2,
                startTime: Math.random() * 5,
                color: ['#ff0000', '#ff6600', '#ffff00', '#00ffff'][Math.floor(Math.random() * 4)]
            });
        }
    }
    
    initComets() {
        for (let i = 0; i < 4; i++) {
            const angle = (Math.random() * Math.PI * 2);
            this.comets.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: Math.cos(angle) * (Math.random() * 2 + 1),
                vy: Math.sin(angle) * (Math.random() * 2 + 1),
                trail: [],
                color: ['#ffff00', '#00ffff', '#ffb6ff'][Math.floor(Math.random() * 3)],
                size: Math.random() * 3 + 2
            });
        }
    }
    
    animate() {
        this.clear();
        this.time += 0.016;
        
        for (let supernova of this.supernovas) {
            const elapsed = (this.time - supernova.startTime) % (supernova.duration + 2);
            
            if (elapsed < supernova.duration) {
                const progress = elapsed / supernova.duration;
                supernova.currentRadius = supernova.maxRadius * progress;
                this.drawSupernova(supernova, progress);
            }
        }
        
        for (let comet of this.comets) {
            comet.x += comet.vx;
            comet.y += comet.vy;
            
            if (comet.x < -100) comet.x = this.canvas.width + 100;
            if (comet.x > this.canvas.width + 100) comet.x = -100;
            if (comet.y < -100) comet.y = this.canvas.height + 100;
            if (comet.y > this.canvas.height + 100) comet.y = -100;
            
            this.drawComet(comet);
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawSupernova(supernova, progress) {
        const gradient = this.ctx.createRadialGradient(
            supernova.x, supernova.y, 0,
            supernova.x, supernova.y, supernova.currentRadius
        );
        
        const opacity = (1 - progress) * 0.8;
        gradient.addColorStop(0, `${supernova.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${supernova.color}${Math.floor(opacity * 128).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${supernova.color}00`);
        
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(
            supernova.x - supernova.currentRadius,
            supernova.y - supernova.currentRadius,
            supernova.currentRadius * 2,
            supernova.currentRadius * 2
        );
    }
    
    drawComet(comet) {
        this.ctx.globalAlpha = 0.6;
        this.ctx.strokeStyle = comet.color;
        this.ctx.lineWidth = comet.size;
        this.ctx.beginPath();
        
        if (comet.trail.length > 0) {
            this.ctx.moveTo(comet.trail[0].x, comet.trail[0].y);
            for (let i = 1; i < comet.trail.length; i++) {
                this.ctx.lineTo(comet.trail[i].x, comet.trail[i].y);
            }
        }
        
        this.ctx.stroke();
        
        comet.trail.push({ x: comet.x, y: comet.y });
        if (comet.trail.length > 30) {
            comet.trail.shift();
        }
        
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = comet.color;
        this.ctx.beginPath();
        this.ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        const gradient = this.ctx.createRadialGradient(
            comet.x, comet.y, 0,
            comet.x, comet.y, comet.size * 3
        );
        gradient.addColorStop(0, comet.color);
        gradient.addColorStop(1, 'transparent');
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(
            comet.x - comet.size * 3,
            comet.y - comet.size * 3,
            comet.size * 6,
            comet.size * 6
        );
    }
    
    clear() {
        this.ctx.globalAlpha = 1;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

const cosmicEffects = new CosmicEffects();