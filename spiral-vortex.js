// Spiral Vortex with text flowing around it
class SpiralVortex {
    constructor() {
        this.canvas = document.getElementById('spiralCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.time = 0;
        this.spiralRadius = 180;
        this.spiralText = 'người người em anh Trang yêu người bé Luôn chúc em 1/1/2021';
        
        this.animate();
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    drawSpiral() {
        this.time += 0.008;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 1.35;
        
        const spiralLoops = 8;
        const pointsPerLoop = 60;
        
        for (let loop = 0; loop < spiralLoops; loop++) {
            this.ctx.globalAlpha = 0.3 - (loop * 0.03);
            
            const gradient = this.ctx.createLinearGradient(
                centerX - 200, centerY - 200,
                centerX + 200, centerY + 200
            );
            
            gradient.addColorStop(0, '#00ffff');
            gradient.addColorStop(0.5, '#ff1493');
            gradient.addColorStop(1, '#ffff00');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2 - (loop * 0.15);
            this.ctx.beginPath();
            
            for (let i = 0; i < pointsPerLoop; i++) {
                const progress = i / pointsPerLoop;
                const angle = progress * Math.PI * 2 + this.time + (loop * Math.PI / 4);
                const radius = this.spiralRadius * (1 + loop * 0.3) * (1 + Math.sin(progress * Math.PI * 2) * 0.3);
                
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
        
        this.drawSpiralText(centerX, centerY);
    }
    
    drawSpiralText(centerX, centerY) {
        const textLength = this.spiralText.length;
        const colors = [
            '#ffb6ff', '#00ffff', '#ff1493', '#00ff88',
            '#ff6600', '#00ced1', '#ffff00', '#ff3366'
        ];
        
        for (let i = 0; i < textLength; i++) {
            const char = this.spiralText[i];
            const progress = i / textLength;
            
            const spiralProgress = this.time * 0.3 + progress;
            const angle = (spiralProgress % 1) * Math.PI * 2;
            const loopIndex = Math.floor(spiralProgress);
            
            const currentRadius = this.spiralRadius * (1 + loopIndex * 0.4);
            const radialOffset = Math.sin(progress * Math.PI * 2) * 30;
            
            const x = centerX + Math.cos(angle) * (currentRadius + radialOffset);
            const y = centerY + Math.sin(angle) * (currentRadius + radialOffset);
            
            const colorIndex = i % colors.length;
            const color = colors[colorIndex];
            
            const opacity = Math.max(0.3, 1 - loopIndex * 0.15);
            
            this.ctx.save();
            this.ctx.globalAlpha = opacity;
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = color;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 8;
            
            this.ctx.translate(x, y);
            this.ctx.rotate(angle + Math.PI / 2);
            this.ctx.fillText(char, 0, 0);
            this.ctx.restore();
        }
    }
    
    setText(newText) {
        this.spiralText = newText + ' ' + this.spiralText;
    }
    
    animate() {
        this.clear();
        this.drawSpiral();
        requestAnimationFrame(() => this.animate());
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

const spiralVortex = new SpiralVortex();