class ProgressCircle {
    constructor(container, textElement) {
        this.container = container;
        this.textElement = textElement;
        this.circleElement = container.querySelector('.progress-circle');
        this.fill = container.querySelector('.progress-fill');
        this.circumference = 2 * Math.PI * 45;
        this.value = 0;
    

        this.circleElement.style.transform = 'rotate(-90deg)';
        this.fill.style.strokeDasharray = this.circumference;
        this.setValue(0);
        
    }
    
    setValue(value) {
        this.value = value;
        const offset = this.circumference - (value / 100) * this.circumference;
        this.fill.style.strokeDashoffset = offset;
        this.textElement.textContent = `${value}%`;
        if (value === 0) {
            this.fill.style.opacity = '0';
        } else {
            this.fill.style.opacity = '1';
        }
    }
    
    toggleAnimation(animate) {
        if (animate) {
           this.container.classList.add('animated');
        } else {
              this.container.classList.remove('animated');
            }
        }
    
    toggleVisibility(hidden) {
        if (hidden) {
            this.container.classList.add('hidden');
        } else {
            this.container.classList.remove('hidden');
        }
    }
}



// Initialize
const progressContainer = document.querySelector('.progress-container');
const progressText = document.querySelector('.progress-text');
const progress = new ProgressCircle(progressContainer, progressText);

// Inputs
const volumeControl = document.getElementById('value');
const animateControl = document.getElementById('animate');
const hideControl = document.getElementById('hide');


volumeControl.addEventListener('input', () => {
    let validateValue = parseInt(volumeControl.value);
  
    if (isNaN(validateValue)) {
        validateValue = 0;
    } else if (validateValue < 0) {
        validateValue = 0;
    } else if (validateValue > 100) {
        validateValue = 100;
    }
    volumeControl.value = validateValue;
    progress.setValue(validateValue);
});

animateControl.addEventListener('change', () => {
    progress.toggleAnimation(animateControl.checked);
});

hideControl.addEventListener('change', () => {
    progress.toggleVisibility(hideControl.checked);
});

