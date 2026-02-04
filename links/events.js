// 2024
const button2024 = document.getElementById("2024");
const modal2024 = document.getElementById("modal2024");

button2024.addEventListener("click", () => {
    modal2024.style.display = "flex";
});

modal2024.addEventListener("click", (e) => {
    console.log(e.target.className);
    if (e.target.className === "modal") {
        modal2024.style.display = "none";
    }
});

// 2025
const button2025 = document.getElementById("2025");
const modal2025 = document.getElementById("modal2025");

button2025.addEventListener("click", () => {
    modal2025.style.display = "flex";
});

modal2025.addEventListener("click", (e) => {
    console.log(e.target.className);
    if (e.target.className === "modal") {
        modal2025.style.display = "none";
    }
});

// 2019
const button2019 = document.getElementById("2019");
const modal2019 = document.getElementById("modal2019");

button2019.addEventListener("click", () => {
    modal2019.style.display = "flex";
});

modal2019.addEventListener("click", (e) => {
    console.log(e.target.className);
    if (e.target.className === "modal") {
        modal2019.style.display = "none";
    }
});

// 2021
const button2021 = document.getElementById("2021");
const modal2021 = document.getElementById("modal2021");

button2021.addEventListener("click", () => {
    modal2021.style.display = "flex";
});

modal2021.addEventListener("click", (e) => {
    console.log(e.target.className);
    if (e.target.className === "modal") {
        modal2021.style.display = "none";
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const clickedButton = event.target.closest('button[id="2024"], button[id="2025"], button[id="2019"], button[id="2021"]');
    const clickedModal = event.target.closest('.modal-content');
    
    // If click is outside any button or modal content, close all modals
    if (!clickedButton && !clickedModal) {
        if (modal2024) modal2024.style.display = "none";
        if (modal2025) modal2025.style.display = "none";
        if (modal2019) modal2019.style.display = "none";
        if (modal2021) modal2021.style.display = "none";
    }
});

// Fullscreen functionality
function openFullscreen(img) {
    // Create fullscreen modal if it doesn't exist
    let fullscreenModal = document.querySelector('.fullscreen-modal');
    
    if (!fullscreenModal) {
        fullscreenModal = document.createElement('div');
        fullscreenModal.className = 'fullscreen-modal';
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'fullscreen-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeFullscreen;
        
        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = img.src;
        fullscreenImg.alt = img.alt;
        
        fullscreenModal.appendChild(closeBtn);
        fullscreenModal.appendChild(fullscreenImg);
        document.body.appendChild(fullscreenModal);
        
        // Close on background click
        fullscreenModal.addEventListener('click', function(e) {
            if (e.target === fullscreenModal) {
                closeFullscreen();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
            }
        });
    } else {
        const fullscreenImg = fullscreenModal.querySelector('img');
        fullscreenImg.src = img.src;
        fullscreenImg.alt = img.alt;
    }
    
    fullscreenModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    const fullscreenModal = document.querySelector('.fullscreen-modal');
    if (fullscreenModal) {
        fullscreenModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
