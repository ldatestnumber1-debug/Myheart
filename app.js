// Main application logic
class CosmicHeartApp {
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
            starHeart.setHeartColor(e.target.value);
        });
        
        // Rotation speed change
        const rotationSpeedInput = document.getElementById('rotationSpeed');
        const speedValue = document.getElementById('speedValue');
        
        rotationSpeedInput.addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            starHeart.setRotationSpeed(speed);
            speedValue.textContent = speed.toFixed(1) + 'x';
        });
    }
    
    updateText() {
        const textInput = document.getElementById('textInput');
        const newText = textInput.value.trim();
        
        if (newText.length > 0) {
            textParticles.setText(newText);
            
            // Vibration feedback if available
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
        new CosmicHeartApp();
    });
} else {
    new CosmicHeartApp();
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'R' to reset text to default
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('textInput').value = 'I LOVE YOU';
        textParticles.setText('I LOVE YOU');
    }
    
    // Press '+' to increase rotation speed
    if (e.key === '+' || e.key === '=') {
        const speedInput = document.getElementById('rotationSpeed');
        const currentSpeed = parseFloat(speedInput.value);
        if (currentSpeed < 2) {
            speedInput.value = Math.min(currentSpeed + 0.1, 2);
            starHeart.setRotationSpeed(parseFloat(speedInput.value));
            document.getElementById('speedValue').textContent = 
                parseFloat(speedInput.value).toFixed(1) + 'x';
        }
    }
    
    // Press '-' to decrease rotation speed
    if (e.key === '-' || e.key === '_') {
        const speedInput = document.getElementById('rotationSpeed');
        const currentSpeed = parseFloat(speedInput.value);
        if (currentSpeed > 0.1) {
            speedInput.value = Math.max(currentSpeed - 0.1, 0.1);
            starHeart.setRotationSpeed(parseFloat(speedInput.value));
            document.getElementById('speedValue').textContent = 
                parseFloat(speedInput.value).toFixed(1) + 'x';
        }
    }
});