// Main application logic
class LoveEternalApp {
    constructor() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Text update
        const updateBtn = document.getElementById('updateBtn');
        const textInput = document.getElementById('textInput');
        
        updateBtn.addEventListener('click', () => this.updateText());
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.updateText();
            }
        });
        
        // Heart color change
        const heartColorInput = document.getElementById('heartColorInput');
        heartColorInput.addEventListener('change', (e) => {
            enhancedHeart.setHeartColor(e.target.value);
        });
        
        // Rotation speed change
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
            spiralText.setText(newText);
            
            // Vibration feedback
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        } else {
            alert('Vui lòng nhập văn bản!');
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LoveEternalApp();
    });
} else {
    new LoveEternalApp();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Reset text
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('textInput').value = 'I believed Love Eternal em anh Trăng Trang yêu người bé Luôn chúc em';
        spiralText.setText('I believed Love Eternal em anh Trăng Trang yêu người bé Luôn chúc em');
    }
    
    // Speed up
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
    
    // Slow down
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