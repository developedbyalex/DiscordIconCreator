// Common Font Awesome icons
const icons = [
   'star', 'heart', 'crown', 'diamond', 'circle', 'square', 
   'trophy', 'medal', 'shield', 'bolt', 'fire', 'sun',
   'moon', 'cloud', 'leaf', 'gear', 'bell', 'flag',
   'user', 'users', 'music', 'video', 'image', 'camera'
];

// Populate icon picker
const iconPicker = document.getElementById('iconPicker');
icons.forEach(icon => {
   const div = document.createElement('div');
   div.className = 'icon-option';
   div.innerHTML = `<i class="fas fa-${icon}"></i>`;
   div.onclick = () => updateIcon(div.innerHTML);
   iconPicker.appendChild(div);
});

// Get elements
const preview = document.getElementById('iconPreview');
const iconElement = preview.querySelector('i');
const shapeSelect = document.getElementById('shape');
const bgColorInput = document.getElementById('bgColor');
const iconColorInput = document.getElementById('iconColor');
const iconSizeInput = document.getElementById('iconSize');
const downloadBtn = document.getElementById('download');
const bgColorStart = document.getElementById('bgColorStart');
const bgColorEnd = document.getElementById('bgColorEnd');
const gradientDirection = document.getElementById('gradientDirection');
const iconColorStart = document.getElementById('iconColorStart');
const iconColorEnd = document.getElementById('iconColorEnd');
const iconInput = document.getElementById('iconInput');
const bgGradientToggle = document.getElementById('bgGradientToggle');
const iconGradientToggle = document.getElementById('iconGradientToggle');
const bgSolidControls = document.getElementById('bgSolidControls');
const bgGradientControls = document.getElementById('bgGradientControls');
const iconSolidControls = document.getElementById('iconSolidControls');
const iconGradientControls = document.getElementById('iconGradientControls');

// Update functions
function updateIcon(iconHtml) {
   if (typeof iconHtml === 'string' && iconHtml.includes('<i')) {
       const temp = document.createElement('div');
       temp.innerHTML = iconHtml;
       const newIcon = temp.firstChild;
       const classes = newIcon.className;
       iconElement.className = classes;
   }
}

function updateShape() {
   preview.style.borderRadius = shapeSelect.value === 'circle' ? '50%' : 
                              shapeSelect.value === 'square' ? '8px' : '0';
   if (shapeSelect.value === 'triangle') {
       preview.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
   } else {
       preview.style.clipPath = 'none';
   }
}

function updateBackground() {
    if (bgGradientToggle.checked) {
        updateBackgroundGradient();
    } else {
        preview.style.background = bgColorInput.value;
    }
}

function updateBackgroundGradient() {
   const direction = gradientDirection.value;
   if (direction === 'circle') {
       preview.style.background = `radial-gradient(circle, ${bgColorStart.value}, ${bgColorEnd.value})`;
   } else {
       preview.style.background = `linear-gradient(${direction}, ${bgColorStart.value}, ${bgColorEnd.value})`;
   }
}

function updateIconColor() {
    if (iconGradientToggle.checked) {
        updateIconGradient();
    } else {
        iconElement.style.background = 'none';
        iconElement.style.webkitBackgroundClip = 'none';
        iconElement.style.backgroundClip = 'none';
        iconElement.style.color = iconColorInput.value;
    }
}

function updateIconGradient() {
   iconElement.style.background = `linear-gradient(to bottom, ${iconColorStart.value}, ${iconColorEnd.value})`;
   iconElement.style.webkitBackgroundClip = 'text';
   iconElement.style.backgroundClip = 'text';
   iconElement.style.color = 'transparent';
}

// Event listeners
iconSizeInput.addEventListener('input', () => {
   iconElement.style.fontSize = `${iconSizeInput.value}px`;
});

shapeSelect.addEventListener('change', updateShape);

// Background controls
bgGradientToggle.addEventListener('change', (e) => {
    bgGradientControls.style.display = e.target.checked ? 'block' : 'none';
    bgSolidControls.style.display = e.target.checked ? 'none' : 'block';
    updateBackground();
});

bgColorInput.addEventListener('input', updateBackground);
bgColorStart.addEventListener('input', updateBackgroundGradient);
bgColorEnd.addEventListener('input', updateBackgroundGradient);
gradientDirection.addEventListener('change', updateBackgroundGradient);

// Icon controls
iconGradientToggle.addEventListener('change', (e) => {
    iconGradientControls.style.display = e.target.checked ? 'block' : 'none';
    iconSolidControls.style.display = e.target.checked ? 'none' : 'block';
    updateIconColor();
});

iconColorInput.addEventListener('input', updateIconColor);
iconColorStart.addEventListener('input', updateIconGradient);
iconColorEnd.addEventListener('input', updateIconGradient);

// Icon input
if (iconInput) {
   iconInput.addEventListener('input', (e) => {
       updateIcon(e.target.value);
   });
}

// Download functionality
downloadBtn.addEventListener('click', () => {
   html2canvas(preview, {
       backgroundColor: null,
       scale: 2, // For better quality
   }).then(canvas => {
       const pngUrl = canvas.toDataURL('image/png');
       const downloadLink = document.createElement('a');
       downloadLink.href = pngUrl;
       downloadLink.download = 'discord-role-icon.png';
       downloadLink.click();
   });
});