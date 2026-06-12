// Spiral Text Animation - Text flowing around the spiral
class SpiralText {
    constructor() {
        this.canvas = document.getElementById('textFlowCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.text = 'I believed Love Eternal em anh Trăng Trang yêu người bé Luôn chúc em';
        this.time = 0;
        this.spiralRadius = 150;
        
        this.colors = [
            '#ffb6ff', '#00ffff', '#ff1493', '#00ff88',
            '#ff6600', '#00ced1', '#ffff00', '#ff3366'
        ];
        
        this.animate();
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    drawSpiralText() {
        this.time += 0.01;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 1.4; // Lower position
        const textLength = this.text.length;
        
        for (let i = 0; i < textLength; i++) {
            const char = this.text[i];
            
            // Spiral coordinates
            const angle = (i / textLength) * Math.PI * 2 + this.time * 0.5;
            const spiralProgress = (i / textLength);
            
            // Spiral out effect
            const currentRadius = this.spiralRadius * (1 + spiralProgress);
            
            const x = centerX + Math.cos(angle) * currentRadius;
            const y = centerY + Math.sin(angle) * currentRadius;
            
            // Get color
            const colorIndex = i % this.colors.length;
            const color = this.colors[colorIndex];
            
            // Calculate opacity based on distance
            const opacity = 0.6 + 0.4 * Math.sin(this.time + i * 0.1);
            
            // Draw character
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = opacity;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(angle + Math.PI / 2);
            this.ctx.fillText(char, 0, 0);
            this.ctx.restore();
        }
    }
    
    setText(newText) {
        this.text = newText;
    }
    
    animate() {
        this.clear();
        this.drawSpiralText();
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

const spiralText = new SpiralText();