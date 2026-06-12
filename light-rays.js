// Light Rays - Laser-like beams shooting from heart
class LightRays {
    constructor() {
        this.canvas = document.getElementById('lightRaysCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.rays = [];
        this.time = 0;
        
        this.initRays();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    initRays() {
        this.rays = [];
        const rayCount = 12;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2;
            this.rays.push({
                angle: angle,
                length: Math.random() * 400 + 300,
                maxLength: Math.random() * 600 + 400,
                intensity: 0.3 + Math.random() * 0.4,
                baseIntensity: 0.3 + Math.random() * 0.4,
                width: Math.random() * 4 + 2,
                color: ['#ff1493', '#00ffff', '#ffff00', '#ff6600'][Math.floor(Math.random() * 4)]
            });
        }
    }
    
    animate() {
        this.clear();
        this.time += 0.005;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let ray of this.rays) {
            ray.length = ray.maxLength * (0.4 + 0.6 * Math.sin(this.time + ray.angle));
            ray.intensity = ray.baseIntensity + Math.sin(this.time * 1.5 + ray.angle * 2) * 0.2;
            
            this.drawRay(ray, centerX, centerY);
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawRay(ray, centerX, centerY) {
        const endX = centerX + Math.cos(ray.angle) * ray.length;
        const endY = centerY + Math.sin(ray.angle) * ray.length;
        
        const gradient = this.ctx.createLinearGradient(centerX, centerY, endX, endY);
        gradient.addColorStop(0, `${ray.color}${Math.floor(ray.intensity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${ray.color}${Math.floor(ray.intensity * 150).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${ray.color}00`);
        
        this.ctx.globalAlpha = ray.intensity;
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = ray.width;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        this.ctx.globalAlpha = ray.intensity * 0.3;
        this.ctx.lineWidth = ray.width * 3;
        this.ctx.strokeStyle = ray.color;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
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

const lightRays = new LightRays();