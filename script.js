/*============================================================
   Sanaullah ScaleFlow University
   script.js — Complete Enterprise JavaScript
   Version: 1.0 (Final)
============================================================*/

(function(global) {
    "use strict";

    // ================================================================
    // 1. DOM REFS — تمام اہم عناصر
    // ================================================================
    const loader = document.getElementById('loader');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('mainSidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const overlay = document.getElementById('sidebarOverlay');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const notificationBell = document.getElementById('notificationBell');
    const notificationPanel = document.getElementById('notificationPanel');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notificationCount = document.getElementById('notificationCount');
    const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const toastContainer = document.getElementById('toast-container');
    const globalSearch = document.getElementById('globalSearchInput');
    const continueProgressBtn = document.getElementById('continueProgressBtn');
    const continueProgress = document.getElementById('continueProgress');
    const progressText = document.getElementById('progressText');
    const studentName = document.getElementById('studentName');
    const brainXP = document.getElementById('brainXP');
    const currentLevel = document.getElementById('currentLevel');
    const learningStreak = document.getElementById('learningStreak');
    const overallProgress = document.getElementById('overallProgress');
    const courseCount = document.getElementById('courseCount');
    const certificateCount = document.getElementById('certificateCount');
    const achievementCount = document.getElementById('achievementCount');
    const projectCount = document.getElementById('projectCount');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const currentYear = document.getElementById('currentYear');

    // ================================================================
    // 2. TOAST — نوٹیفکیشن دکھانے کا فنکشن
    // ================================================================
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

    // ================================================================
    // 3. LOADER — صفحہ لوڈ ہونے پر چھپائیں
    // ================================================================
    function hideLoader() {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }
    }

    // ================================================================
    // 4. SIDEBAR — ہیمبرگر مینو اور اوورلے
    // ================================================================
    function toggleSidebar(open) {
        const isOpen = (open !== undefined) ? open : sidebar.classList.toggle('open');
        if (open !== undefined) {
            if (open) sidebar.classList.add('open');
            else sidebar.classList.remove('open');
        }
        overlay.classList.toggle('active', sidebar.classList.contains('open'));
        menuToggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }

    menuToggle?.addEventListener('click', () => toggleSidebar());
    sidebarClose?.addEventListener('click', () => toggleSidebar(false));
    overlay?.addEventListener('click', () => toggleSidebar(false));

    // بڑی سکرین پر سائیڈبار خودکار بند
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && sidebar.classList.contains('open')) {
            toggleSidebar(false);
        }
    });

    // ================================================================
    // 5. DARK MODE — تھیم تبدیل کریں اور محفوظ کریں
    // ================================================================
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }

    // پہلے سے محفوظ تھیم لوڈ کریں
    (function loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeBtn.textContent = '☀️';
        }
    })();

    darkModeBtn?.addEventListener('click', toggleDarkMode);

    // ================================================================
    // 6. NOTIFICATION PANEL — گھنٹی کا پینل
    // ================================================================
    notificationBell?.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationPanel.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (notificationPanel && !notificationPanel.contains(e.target) && !notificationBell.contains(e.target)) {
            notificationPanel.classList.remove('open');
        }
    });

    markAllReadBtn?.addEventListener('click', function() {
        document.querySelectorAll('.notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        if (notificationCount) notificationCount.textContent = '0';
        showToast('✅ All notifications marked as read', 'success');
    });

    // ================================================================
    // 7. MODAL — کھلنا / بند ہونا
    // ================================================================
    function openModal(title, bodyHTML) {
        modalTitle.textContent = title;
        modalBody.innerHTML = bodyHTML;
        modalContainer.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalContainer.classList.remove('open');
        document.body.style.overflow = '';
    }

    modalCloseBtn?.addEventListener('click', closeModal);
    modalCancelBtn?.addEventListener('click', closeModal);
    modalConfirmBtn?.addEventListener('click', function() {
        showToast('✅ Confirmed!', 'success');
        closeModal();
    });
    modalContainer?.addEventListener('click', function(e) {
        if (e.target === modalContainer) closeModal();
    });

    // ================================================================
    // 8. NAVIGATION — صفحات کا تبادلہ
    // ================================================================
    const navLinks = document.querySelectorAll('.sidebar-menu a[data-page]');
    const pageSections = {
        page1: document.getElementById('page1'),
        pageSettings: document.getElementById('pageSettings'),
        pageSecurity: document.getElementById('pageSecurity'),
        pageAI: document.getElementById('pageAI'),
        pageFeedback: document.getElementById('pageFeedback'),
        page3D: document.getElementById('page3D'),
        pageCV: document.getElementById('pageCV')
    };

    function navigateTo(pageId) {
        // تمام صفحات چھپائیں
        Object.values(pageSections).forEach(section => {
            if (section) section.classList.remove('active');
        });
        // مطلوبہ صفحہ دکھائیں
        const target = pageSections[pageId];
        if (target) target.classList.add('active');
        // سائیڈبار میں فعال لنک کو نمایاں کریں
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar-menu a[data-page="${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');
        // موبائل پر سائیڈبار بند کریں
        if (sidebar.classList.contains('open')) toggleSidebar(false);
        // اوپر سکرول کریں
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page && pageSections[page]) {
                navigateTo(page);
            }
        });
    });

    // ================================================================
    // 9. SEARCH — گلوبل سرچ
    // ================================================================
    globalSearch?.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.gateway-card, .course-card, .product-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    // ================================================================
    // 10. CONTINUE LEARNING — پروگریس بڑھائیں
    // ================================================================
    continueProgressBtn?.addEventListener('click', function() {
        let progress = parseInt(continueProgress.style.width) || 65;
        if (progress >= 100) {
            showToast('🎉 Course Complete!', 'success');
            return;
        }
        progress = Math.min(progress + 5, 100);
        continueProgress.style.width = progress + '%';
        progressText.textContent = progress + '% Complete';
        showToast(`📈 Progress updated to ${progress}%`, 'info');
    });

    // ================================================================
    // 11. QUICK ACTIONS — نیویگیشن شارٹ کٹس
    // ================================================================
    document.getElementById('quickStartLearning')?.addEventListener('click', () => navigateTo('page4'));
    document.getElementById('quickAskAI')?.addEventListener('click', () => navigateTo('page7'));
    document.getElementById('quickBrowseCourses')?.addEventListener('click', () => navigateTo('page3'));
    document.getElementById('quickMyCertificates')?.addEventListener('click', () => navigateTo('page5'));

    // ================================================================
    // 12. DASHBOARD STATS — ڈیمو ڈیٹا اپ ڈیٹ
    // ================================================================
    function updateDashboardStats() {
        const data = {
            name: 'Sanaullah',
            xp: '250 XP',
            level: 'Level 5',
            streak: '7 Days',
            progress: '75%',
            courses: 12,
            certificates: 4,
            achievements: 8,
            projects: 3
        };
        if (studentName) studentName.textContent = data.name;
        if (brainXP) brainXP.textContent = data.xp;
        if (currentLevel) currentLevel.textContent = data.level;
        if (learningStreak) learningStreak.textContent = data.streak;
        if (overallProgress) overallProgress.textContent = data.progress;
        if (courseCount) courseCount.textContent = data.courses;
        if (certificateCount) certificateCount.textContent = data.certificates;
        if (achievementCount) achievementCount.textContent = data.achievements;
        if (projectCount) projectCount.textContent = data.projects;
    }
    updateDashboardStats();

    // ================================================================
    // 13. TODAY'S TASKS — چیک باکس پر کلک
    // ================================================================
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.6';
                showToast('🎉 Task completed!', 'success');
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
    });

    // ================================================================
    // 14. RATING STARS — ستاروں کا انتخاب
    // ================================================================
    let selectedRating = 0;
    document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.value);
            document.querySelectorAll('.rating-star').forEach(s => {
                s.style.background = '';
                s.setAttribute('aria-checked', 'false');
            });
            this.style.background = 'var(--primary)';
            this.setAttribute('aria-checked', 'true');
            document.getElementById('fbRatingValue').textContent = selectedRating + ' stars';
        });
    });
    document.getElementById('fbRatingSubmit')?.addEventListener('click', function() {
        if (selectedRating === 0) {
            showToast('⚠️ Please select a rating', 'warning');
            return;
        }
        showToast('⭐ Thank you for rating us!', 'success');
    });

    // ================================================================
    // 15. LOGIN FORM — ویلڈیشن
    // ================================================================
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        if (!email || !password) {
            showToast('⚠️ Please fill in both fields.', 'warning');
            return;
        }
        if (!email.includes('@')) {
            showToast('⚠️ Please enter a valid email address.', 'warning');
            return;
        }
        if (password.length < 6) {
            showToast('⚠️ Password must be at least 6 characters.', 'warning');
            return;
        }
        showToast('✅ Login successful! Redirecting...', 'success');
        setTimeout(() => navigateTo('page1'), 1500);
    });

    // ================================================================
    // 16. FORGOT PASSWORD & REGISTER — موڈل میں
    // ================================================================
    document.getElementById('forgotPasswordLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('🔑 Forgot Password', `
            <p>Enter your email to receive OTP.</p>
            <input type="email" placeholder="student@university.com" id="otpEmail" style="width:100%;padding:12px;border-radius:12px;border:2px solid var(--border);margin:12px 0;">
            <button id="otpSendBtn" class="btn-primary" type="button">Send OTP</button>
        `);
        document.getElementById('otpSendBtn')?.addEventListener('click', function() {
            showToast('📧 OTP sent to your email!', 'success');
            closeModal();
        });
    });

    document.getElementById('registerLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('📝 Register', `
            <form id="registerForm">
                <div class="form-group"><label>Full Name</label><input type="text" placeholder="Sanaullah" required></div>
                <div class="form-group"><label>Email</label><input type="email" placeholder="student@university.com" required></div>
                <div class="form-group"><label>Password</label><input type="password" placeholder="••••••••" required></div>
                <button type="submit" class="btn-primary">Create Account</button>
            </form>
        `);
        document.getElementById('registerForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('✅ Account created! Please login.', 'success');
            closeModal();
        });
    });

    // ================================================================
    // 17. SCROLL TO TOP — بٹن ظاہر/چھپائیں
    // ================================================================
    window.addEventListener('scroll', function() {
        if (scrollTopBtn) {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        }
    });
    scrollTopBtn?.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================================================================
    // 18. CURRENT YEAR — فوٹر میں سال
    // ================================================================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ================================================================
    // 19. KEYBOARD SHORTCUTS — Ctrl+K سرچ، Escape موڈل/پینل/سائیڈبار بند
    // ================================================================
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (globalSearch) globalSearch.focus();
        }
        if (e.key === 'Escape') {
            if (modalContainer && modalContainer.classList.contains('open')) closeModal();
            if (notificationPanel && notificationPanel.classList.contains('open')) {
                notificationPanel.classList.remove('open');
            }
            if (sidebar && sidebar.classList.contains('open')) {
                toggleSidebar(false);
            }
        }
    });

    // ================================================================
    // 20. MISCELLANEOUS BUTTONS — باقی بٹنز کے لیے ٹوسٹ
    // ================================================================
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-danger').forEach(btn => {
        const skipIds = ['darkModeBtn', 'modalCloseBtn', 'modalCancelBtn', 'modalConfirmBtn',
            'continueProgressBtn', 'quickStartLearning', 'quickAskAI', 'quickBrowseCourses',
            'quickMyCertificates', 'menuToggle', 'sidebarClose', 'notificationBell', 'markAllReadBtn',
            'scrollTopBtn', 'settingsThemeBtn', 'loginSubmitBtn', 'fbRatingSubmit'
        ];
        if (skipIds.includes(btn.id)) return;
        if (btn.type !== 'submit' && !btn.closest('form')) {
            btn.addEventListener('click', function(e) {
                const text = this.textContent.trim();
                if (text && !this.closest('.chat-input') && !this.closest('.modal-footer')) {
                    showToast(`🔄 ${text}`, 'info');
                }
            });
        }
    });

    // ================================================================
    // 21. BOOT — سب کچھ شروع کریں
    // ================================================================
    document.addEventListener('DOMContentLoaded', function() {
        hideLoader();
        showToast('🎓 Welcome to ScaleFlow University', 'success');
        navigateTo('page1');
        console.log('🚀 ScaleFlow University loaded successfully');
    });

    // ================================================================
    // 22. GLOBAL — اگر کسی اور فائل کو ضرورت ہو
    // ================================================================
    global.ScaleFlow = {
        showToast,
        openModal,
        closeModal,
        navigateTo,
        toggleDarkMode,
        toggleSidebar,
        updateDashboardStats
    };

})(window);
