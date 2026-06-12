// Main app logic
class LoveEternalApp {
    constructor() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const updateBtn = document.getElementById('updateBtn');
        const textInput = document.getElementById('textInput');
        
        updateBtn.addEventListener('click', () => this.updateText());
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.updateText();
            }
        });
        
        const heartColorInput = document.getElementById('heartColorInput');
        heartColorInput.addEventListener('change', (e) => {
            enhancedHeart.setHeartColor(e.target.value);
        });
        
        const rotationSpeedInput = document.getElementById('rotationSpeed');
        const speedValue = document.getElementById('speedValue');
        
        rotationSpeedInput.addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            enhancedHeart.setRotationSpeed(speed);
            speedValue.textContent = speed.toFixed(1) + 'x';
        });
    }
    
    updateText() {
        const textInput = document.getElementById('textInput');
        const newText = textInput.value.trim();
        
        if (newText.length > 0) {
            spiralVortex.setText(newText);
            
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        } else {
            alert('Vui lòng nhập văn bản!');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LoveEternalApp();
    });
} else {
    new LoveEternalApp();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('textInput').value = 'I believed Love Eternal';
    }
    
    if (e.key === '+' || e.key === '=') {
        const speedInput = document.getElementById('rotationSpeed');
        const currentSpeed = parseFloat(speedInput.value);
        if (currentSpeed < 2) {
            speedInput.value = Math.min(currentSpeed + 0.1, 2);
            enhancedHeart.setRotationSpeed(parseFloat(speedInput.value));
            document.getElementById('speedValue').textContent = 
                parseFloat(speedInput.value).toFixed(1) + 'x';
        }
    }
    
    if (e.key === '-' || e.key === '_') {
        const speedInput = document.getElementById('rotationSpeed');
        const currentSpeed = parseFloat(speedInput.value);
        if (currentSpeed > 0.1) {
            speedInput.value = Math.max(currentSpeed - 0.1, 0.1);
            enhancedHeart.setRotationSpeed(parseFloat(speedInput.value));
            document.getElementById('speedValue').textContent = 
                parseFloat(speedInput.value).toFixed(1) + 'x';
        }
    }
});