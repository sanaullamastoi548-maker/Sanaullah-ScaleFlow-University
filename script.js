/*==========================================
   Sanaullah ScaleFlow University
   script.js — Core Logic
   Version: 1.0
==========================================*/

(function() {
    "use strict";

    // ==========================================
    // 1. DOM REFS
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

   const learningHubCard = document.getElementById("learningHubCard");
const aiHubCard = document.getElementById("aiHubCard");
const automationHubCard = document.getElementById("automationHubCard");
const toolsHubCard = document.getElementById("toolsHubCard");
const businessHubCard = document.getElementById("businessHubCard");
const freelancingHubCard = document.getElementById("freelancingHubCard");
const certificateHubCard = document.getElementById("certificateHubCard");
const dashboardHubCard = document.getElementById("dashboardHubCard");
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
       .btn-secondary{
    background:#ffffff;
    color:#111827;
    border:2px solid #fbbf24;
    padding:12px 24px;
    border-radius:12px;
    font-size:16px;
    font-weight:600;
    cursor:pointer;
    transition:.3s;
}

.btn-secondary:hover{
    background:#fbbf24;
    color:#ffffff;
    transform:translateY(-3px);
}
       
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

    // ==========================================
    // 10. TODAY TASKS
    // ==========================================
    function initTasks() {
        const tasks = document.querySelectorAll(".task-item input");
        if (tasks.length === 0) return;
        tasks.forEach(task => {
            task.addEventListener("change", function() {
                if (this.checked) {
                    this.parentElement.style.opacity = "0.7";
                    this.nextElementSibling.style.textDecoration = "line-through";
                    showToast("🎉 Task Completed!", "success");
                } else {
                    this.parentElement.style.opacity = "1";
                    this.nextElementSibling.style.textDecoration = "none";
                }
            });
        });
    }

    // ==========================================
    // 11. PAGE NAVIGATION
    // ==========================================
    function initPageNavigation() {
        const links = document.querySelectorAll('.sidebar-menu a[data-page]');
        const sections = {
            home: document.getElementById('homePage'),
            courses: document.getElementById('coursesPage'),
            achievements: document.getElementById('achievementsPage'),
            certificates: document.getElementById('certificatesPage'),
            profile: document.getElementById('profilePage')
        };

        const allExist = Object.values(sections).every(el => el !== null);
        if (!allExist) {
            console.warn('⚠️ Some page sections are missing in HTML');
            return;
        }

        function showPage(pageId) {
            Object.values(sections).forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            const target = sections[pageId];
            if (target) {
                target.style.display = 'block';
                requestAnimationFrame(() => {
                    target.classList.add('active');
                });
            }
        }

        // Home page active by default
        showPage('home');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.dataset.page;
                if (page && sections[page]) {
                    showPage(page);
                    document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    showToast(`📄 ${page.charAt(0).toUpperCase() + page.slice(1)}`, 'info');
                }
            });
        });
    }

    // ==========================================
    // 12. FOOTER
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
    // 13. KEYBOARD SHORTCUTS
    // ==========================================
    function initKeyboard() {
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (searchInput) searchInput.focus();
            }
            if (e.key === 'Escape' && searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
            if (e.ctrlKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                toggleDarkMode();
            }
        });
    }

    // ==========================================
    // 14. MAIN INIT
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
        initTasks();
        initPageNavigation();

        if (darkBtn) {
            darkBtn.addEventListener('click', toggleDarkMode);
        }
       // Continue Learning Progress Button
function initContinueProgress() {
    const btn = document.getElementById('continueProgressBtn');
    const fill = document.getElementById('continueProgress');
    const text = document.getElementById('progressText');
    if (!btn || !fill || !text) return;

    let progress = parseInt(fill.style.width) || 65;

    btn.addEventListener('click', function() {
        if (progress >= 100) {
            showToast('🎉 Course Complete!', 'success');
            return;
        }
        progress = Math.min(progress + 5, 100);
        fill.style.width = progress + '%';
        text.textContent = progress + '% Complete';
        showToast(`📈 Progress updated to ${progress}%`, 'info');
    });
}

        showToast('🎓 Welcome to ScaleFlow University', 'success');
        console.log('🚀 ScaleFlow University loaded successfully');
    }

   // ==========================================
// WEEKLY PROGRESS CHART
// ==========================================
function initWeeklyProgress() {

    const bars = document.querySelectorAll(".progress-chart .bar");

    if (bars.length === 0) return;

    bars.forEach(bar => {

        const finalHeight = bar.style.height;

        bar.style.height = "0px";

        setTimeout(() => {
            bar.style.height = finalHeight;
        }, 300);

    });

}

    // ==========================================
    // 15. START
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
