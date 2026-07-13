
console.log("script.js loaded");
/==========================================
Sanaullah ScaleFlow University
script.js — Core Logic
Version: 1.0
==========================================/

(function() {
"use strict";

// ==========================================  
// 1. DOM REFS (تمام IDs کے ساتھ)  
// ==========================================  
const loader = document.getElementById('loader');  
const searchInput = document.getElementById('searchInput');  
const darkBtn = document.getElementById('darkModeBtn');  
const scrollBtn = document.getElementById('scrollTopBtn');  
const toastContainer = document.getElementById('toast-container');  
const yearEl = document.getElementById('currentYear');  
const versionEl = document.getElementById('footerVersion');  

const sidebarLinks = document.querySelectorAll('.sidebar-menu a');  
const cards = document.querySelectorAll('.card');  

const continueBtn = document.getElementById('continueLearningBtn');  
const browseBtn = document.getElementById('browseCoursesBtn');  

// ==========================================  
// 2. TOAST  
// ==========================================  
function showToast(message, type = 'info') {  
    if (!toastContainer) return;  
    const toast = document.createElement('div');  
    toast.className = `toast toast-${type}`;  
    toast.textContent = message;  
    toastContainer.appendChild(toast);  
    setTimeout(() => {  
        toast.style.opacity = '0';  
        setTimeout(() => toast.remove(), 300);  
    }, 3000);  
}  

// ==========================================  
// 3. LOADER  
// ==========================================  
function hideLoader() {  
    if (loader) {  
        loader.classList.add('hidden');  
        setTimeout(() => { loader.style.display = 'none'; }, 500);  
    }  
}  

// ==========================================  
// 4. DARK MODE  
// ==========================================  
function toggleDarkMode() {  
    document.body.classList.toggle('dark-mode');  
    const isDark = document.body.classList.contains('dark-mode');  
    darkBtn.textContent = isDark ? '☀️' : '🌙';  
    localStorage.setItem('theme', isDark ? 'dark' : 'light');  
    showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');  
}  

function loadTheme() {  
    const saved = localStorage.getItem('theme');  
    if (saved === 'dark') {  
        document.body.classList.add('dark-mode');  
        darkBtn.textContent = '☀️';  
    }  
}  

// ==========================================  
// 5. SCROLL TOP  
// ==========================================  
function initScrollTop() {  
    if (!scrollBtn) return;  
    window.addEventListener('scroll', () => {  
        scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';  
    });  
    scrollBtn.addEventListener('click', () => {  
        window.scrollTo({ top: 0, behavior: 'smooth' });  
    });  
}  

// ==========================================  
// 6. SEARCH  
// ==========================================  
function initSearch() {  
    if (!searchInput) return;  
    searchInput.addEventListener('input', function() {  
        const query = this.value.toLowerCase().trim();  
        cards.forEach(card => {  
            const text = card.textContent.toLowerCase();  
            card.style.display = text.includes(query) ? 'block' : 'none';  
        });  
    });  
}  

// ==========================================  
// 7. SIDEBAR  
// ==========================================  
function initSidebar() {  
    sidebarLinks.forEach(link => {  
        link.addEventListener('click', function(e) {  
            e.preventDefault();  
            sidebarLinks.forEach(l => l.classList.remove('active'));  
            this.classList.add('active');  
            const page = this.dataset.page || 'home';  
            showToast(`📄 Navigating to ${page}`, 'info');  
        });  
    });  
}  

// ==========================================  
// 8. CARDS CLICK  
// ==========================================  
function initCards() {  
    cards.forEach(card => {  
        card.addEventListener('click', function() {  
            const module = this.dataset.module || 'unknown';  
            const name = this.querySelector('h3')?.textContent || module;  
            showToast(`🔍 Opening ${name}...`, 'info');  
        });  
    });  
}  

// ==========================================  
// 9. HERO BUTTONS  
// ==========================================  
function initHeroButtons() {  
    if (continueBtn) {  
        continueBtn.addEventListener('click', () => {  
            showToast('▶️ Continuing your learning...', 'success');  
        });  
    }  
    if (browseBtn) {  
        browseBtn.addEventListener('click', () => {  
            showToast('📚 Opening course catalog...', 'info');  
        });  
    }  
}  
    initHeroButtons();
initTasks();
initScrollTop();
initKeyboard();

    // ==========================================
// TODAY TASKS
// ==========================================
function init() {

    loadTheme();
    hideLoader();
    updateFooter();

    initSearch();
    initSidebar();
    initCards();
    initHeroButtons();
    initScrollTop();
    initKeyboard();

    initTasks();   // 👈 یہ لائن ضرور شامل کریں

    if (darkBtn) {
        darkBtn.addEventListener('click', toggleDarkMode);
    }

    showToast('🎓 Welcome to ScaleFlow University', 'success');
}

// ==========================================  
// 10. FOOTER (Version & Year)  
// ==========================================  
function updateFooter() {  
    if (yearEl) {  
        yearEl.textContent = new Date().getFullYear();  
    }  
    if (versionEl) {  
        versionEl.textContent = 'Version 1.0';  
    }  
}  

// ==========================================  
// 11. KEYBOARD SHORTCUTS  
// ==========================================  
function initKeyboard() {  
    document.addEventListener('keydown', function(e) {  
        // Ctrl+K → focus search  
        if (e.ctrlKey && e.key.toLowerCase() === 'k') {  
            e.preventDefault();  
            if (searchInput) searchInput.focus();  
        }  
        // Escape → clear search  
        if (e.key === 'Escape' && searchInput) {  
            searchInput.value = '';  
            searchInput.dispatchEvent(new Event('input'));  
        }  
        // Ctrl+D → toggle dark mode  
        if (e.ctrlKey && e.key.toLowerCase() === 'd') {  
            e.preventDefault();  
            toggleDarkMode();  
        }  
    });  
}  

// ==========================================  
// 12. MAIN INIT  
// ==========================================  
console.log("init started");
function init() {  
    loadTheme();  
    hideLoader();  
    updateFooter();  
    initSearch();  
    initSidebar();  
    initCards();  
    initHeroButtons();  
    initScrollTop();  
    initKeyboard();  

    // Dark mode button  
    if (darkBtn) {  
        darkBtn.addEventListener('click', toggleDarkMode);  
    }  

    showToast('🎓 Welcome to ScaleFlow University', 'success');  
    console.log('🚀 ScaleFlow University loaded successfully');  
}  

// ==========================================  
// 13. START  
// ==========================================  
if (document.readyState === 'loading') {  
    document.addEventListener('DOMContentLoaded', init);  
} else {  
    init();  
}

})();
