/* ============================================================
   Home.js — ScaleFlow University Home Page (Locked v1.0)
   تمام مسائل حل کیے گئے۔ اب Production Ready اور Lock کرنے کے قابل۔
   ============================================================ */

(function(global) {
    'use strict';

    // ============================================================
    // فیز 1: کور انیشیلیزیشن
    // ============================================================
    console.log('🚀 ScaleFlow University: Initializing...');

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }
    }
    window.addEventListener('load', hideLoader);

    // ============================================================
    // فیز 2: ٹوسٹ انجن (مع کوئو سسٹم اور ڈاکیومینٹ فرگمنٹ)
    // ============================================================
    let toastQueue = [];
    let isToastShowing = false;

    function showToast(message, type = 'info') {
        toastQueue.push({ message, type });
        if (!isToastShowing) {
            processToastQueue();
        }
    }

    function processToastQueue() {
        if (toastQueue.length === 0) {
            isToastShowing = false;
            return;
        }
        isToastShowing = true;
        const { message, type } = toastQueue.shift();
        const container = document.getElementById('toast-container');
        if (!container) {
            console.log(`[${type}] ${message}`);
            isToastShowing = false;
            processToastQueue();
            return;
        }
        // DocumentFragment استعمال کریں
        const fragment = document.createDocumentFragment();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        fragment.appendChild(toast);
        container.appendChild(fragment);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(40px)';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
                isToastShowing = false;
                processToastQueue();
            }, 400);
        }, 3500);
    }

    // ============================================================
    // فیز 3: موڈل انجن
    // ============================================================
    function openModal(title, bodyHTML, type = 'default') {
        const modal = document.getElementById('modal-container');
        const titleEl = document.getElementById('modalTitle');
        const bodyEl = document.getElementById('modalBody');
        if (!modal || !titleEl || !bodyEl) {
            console.warn('Modal elements not found. Using alert fallback.');
            alert(title + '\n\n' + bodyHTML.replace(/<[^>]*>/g, ''));
            return;
        }
        titleEl.textContent = title || 'Modal';
        bodyEl.innerHTML = bodyHTML || 'No content';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        modal.dataset.type = type;
    }

    function closeModal() {
        const modal = document.getElementById('modal-container');
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // ============================================================
    // فیز 4: ڈارک موڈ (خودکار CSS انجیکشن + transition)
    // ============================================================
    function ensureDarkModeStyles() {
        if (document.getElementById('darkModeStyles')) return;
        const style = document.createElement('style');
        style.id = 'darkModeStyles';
        style.textContent = `
            body, body * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            }
            body.dark-mode {
                background: #0f172a;
                color: #f1f5f9;
            }
            body.dark-mode .header,
            body.dark-mode .sidebar,
            body.dark-mode .footer,
            body.dark-mode .hero,
            body.dark-mode .continue-card,
            body.dark-mode .task-list,
            body.dark-mode .activity-timeline,
            body.dark-mode .weekly-progress,
            body.dark-mode .achievement-card,
            body.dark-mode .quick-action-btn,
            body.dark-mode .ecosystem-card,
            body.dark-mode .modal,
            body.dark-mode .stat-card {
                background: #1e293b;
                border-color: #334155;
                color: #f1f5f9;
            }
            body.dark-mode .main-content {
                background: #0f172a;
            }
            body.dark-mode .search-section input {
                background: #1e293b;
                border-color: #334155;
                color: #f1f5f9;
            }
            body.dark-mode .btn-secondary {
                background: transparent;
                color: #f1f5f9;
                border-color: #334155;
            }
            body.dark-mode .btn-secondary:hover {
                background: #FFC107;
                color: #000;
            }
            body.dark-mode .hero-stat {
                background: rgba(255,255,255,0.05);
                border-color: #334155;
            }
            body.dark-mode .section-header span {
                background: #334155;
                color: #f1f5f9;
            }
            body.dark-mode .day p {
                color: #94a3b8;
            }
            body.dark-mode .footer a {
                color: #94a3b8;
            }
            body.dark-mode .footer a:hover {
                color: #FFC107;
            }
            body.dark-mode .activity-item strong {
                color: #f1f5f9;
            }
            body.dark-mode .task-item {
                border-bottom-color: #334155;
            }
            body.dark-mode .footer-bottom {
                border-top-color: #334155;
            }
        `;
        document.head.appendChild(style);
    }

    function initThemeEngine() {
        try {
            ensureDarkModeStyles();
            const darkBtn = document.getElementById('darkModeBtn');
            if (!darkBtn) return;

            (function restore() {
                const saved = localStorage.getItem('theme');
                if (saved === 'dark') {
                    document.body.classList.add('dark-mode');
                    darkBtn.textContent = '☀️';
                } else {
                    darkBtn.textContent = '🌙';
                }
            })();

            darkBtn.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                this.textContent = isDark ? '☀️' : '🌙';
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
            });
        } catch (e) {
            console.error('Theme Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 5: نیویگیشن انجن
    // ============================================================
    function initNavigation() {
        try {
            const navLinks = document.querySelectorAll('.sidebar-menu a[data-page]');
            const pageSections = document.querySelectorAll('.page-section');

            function navigateTo(pageId) {
                pageSections.forEach(section => section.classList.remove('active'));
                const target = document.getElementById(pageId);
                if (target) {
                    target.classList.add('active');
                } else {
                    showToast(`📄 "${pageId}" is coming soon!`, 'info');
                    const home = document.getElementById('page1');
                    if (home) home.classList.add('active');
                    return;
                }
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.sidebar-menu a[data-page="${pageId}"]`);
                if (activeLink) activeLink.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.dataset.page;
                    if (page) navigateTo(page);
                });
            });

            if (!document.querySelector('.page-section.active')) {
                const home = document.getElementById('page1');
                if (home) home.classList.add('active');
            }

            global.navigateTo = navigateTo;
        } catch (e) {
            console.error('Navigation Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 6: ہیرو انجن
    // ============================================================
    function initHeroEngine() {
        try {
            const continueBtn = document.getElementById('continueLearningBtn');
            const browseBtn = document.getElementById('browseCoursesBtn');

            if (continueBtn) {
                continueBtn.addEventListener('click', function() {
                    showToast('▶ Redirecting to your current lesson...', 'info');
                    openModal('▶ Continue Learning', 'You are being redirected to <strong>Lesson 5: Prompt Engineering</strong>.');
                });
            }
            if (browseBtn) {
                browseBtn.addEventListener('click', function() {
                    openModal('📚 Browse Courses', 'Available courses:<br>✅ AI Fundamentals<br>✅ Web Development<br>✅ Data Science');
                });
            }
        } catch (e) {
            console.error('Hero Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 7: سرچ انجن (Enter پر، Live بعد میں)
    // ============================================================
    function initSearchEngine() {
        try {
            const searchInput = document.getElementById('globalSearchInput');
            if (!searchInput) return;

            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                    e.preventDefault();
                    searchInput.focus();
                    searchInput.select();
                    showToast('🔍 Search activated!', 'info');
                }
            });

            // Live search - فی الحال خالی، بعد میں شامل کریں گے
            searchInput.addEventListener('input', function() {
                // مستقبل کے لیے
            });

            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = this.value.trim();
                    if (query.length === 0) {
                        showToast('⚠️ Please enter a search term.', 'warning');
                        return;
                    }
                    openModal('🔍 Search Results', `Results for "<strong>${query}</strong>":<br>🔹 AI Fundamentals<br>🔹 Web Development<br>🔹 Data Science`);
                    this.value = '';
                    this.blur();
                }
            });

            searchInput.addEventListener('focus', function() {
                this.style.borderColor = '#FFC107';
            });
            searchInput.addEventListener('blur', function() {
                this.style.borderColor = '';
            });
        } catch (e) {
            console.error('Search Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 8: پروگریس انجن (بہتر پارسنگ)
    // ============================================================
    function initProgressEngine() {
        try {
            const xpEl = document.getElementById('brainXP');
            const levelEl = document.getElementById('currentLevel');
            const streakEl = document.getElementById('learningStreak');
            const progressEl = document.getElementById('overallProgress');

            function extractNumber(text) {
                if (!text) return 0;
                const num = Number(text.replace(/[^\d.]/g, ''));
                return isNaN(num) ? 0 : num;
            }

            function animateValue(element, target, suffix = '') {
                if (!element) return;
                const current = extractNumber(element.textContent);
                let start = current;
                const step = Math.max(1, Math.floor(target / 40));
                const interval = setInterval(() => {
                    start += step;
                    if (start >= target) {
                        start = target;
                        clearInterval(interval);
                    }
                    element.textContent = start + suffix;
                }, 30);
            }

            setTimeout(() => {
                animateValue(xpEl, 250, ' XP');
                animateValue(levelEl, 5, '');
                animateValue(streakEl, 7, ' Days');
                animateValue(progressEl, 75, '%');

                const progressBar = document.getElementById('courseProgressBar');
                if (progressBar) {
                    progressBar.style.transition = 'width 1.5s ease';
                    progressBar.style.width = '75%';
                }
            }, 400);
        } catch (e) {
            console.error('Progress Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 9: لرننگ کارڈ
    // ============================================================
    function initLearningCardEngine() {
        try {
            const resumeBtn = document.getElementById('resumeCourseBtn');
            if (!resumeBtn) return;

            resumeBtn.addEventListener('click', function() {
                const bar = document.getElementById('courseProgressBar');
                const text = document.getElementById('courseProgressText');
                if (!bar || !text) {
                    showToast('⚠️ Progress data not found.', 'error');
                    return;
                }
                let current = parseInt(text.textContent) || 75;
                if (current < 100) {
                    current = Math.min(100, current + 5);
                    text.textContent = current + '%';
                    bar.style.width = current + '%';

                    const xpEl = document.getElementById('brainXP');
                    if (xpEl) {
                        let xp = parseInt(xpEl.textContent) || 250;
                        xp += 10;
                        xpEl.textContent = xp + ' XP';
                    }

                    if (current === 100) {
                        openModal('🎉 Course Complete!', 'You completed <strong>AI Fundamentals</strong>! 🏆');
                        showToast('🎉 Course Completed!', 'success');
                    } else {
                        showToast(`📖 Progress: ${current}%`, 'info');
                    }
                } else {
                    showToast('🎉 Already completed!', 'success');
                }
            });
        } catch (e) {
            console.error('Learning Card Error:', e);
        }
    }

    // ============================================================
    // فیز 10: ٹاسک انجن
    // ============================================================
    function initTasksEngine() {
        try {
            const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
            const xpEl = document.getElementById('brainXP');
            const progressEl = document.getElementById('overallProgress');

            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', function() {
                    const label = this.nextElementSibling;
                    const taskText = label ? label.textContent : 'Task';
                    if (this.checked) {
                        label.style.textDecoration = 'line-through';
                        label.style.color = '#7A7A9A';
                        showToast(`✅ Completed: ${taskText}`, 'success');
                        if (xpEl) {
                            let xp = parseInt(xpEl.textContent) || 250;
                            xp += 15;
                            xpEl.textContent = xp + ' XP';
                        }
                        if (progressEl) {
                            let prog = parseInt(progressEl.textContent) || 75;
                            prog = Math.min(100, prog + 2);
                            progressEl.textContent = prog + '%';
                            const bar = document.getElementById('courseProgressBar');
                            if (bar) bar.style.width = prog + '%';
                        }
                    } else {
                        label.style.textDecoration = 'none';
                        label.style.color = '';
                        showToast(`↩️ Unchecked: ${taskText}`, 'warning');
                    }
                    const total = document.querySelectorAll('.task-item input[type="checkbox"]').length;
                    const done = document.querySelectorAll('.task-item input[type="checkbox"]:checked').length;
                    if (done === total && total > 0) {
                        showToast('🎉 All tasks done! You\'re on fire! 🔥', 'success');
                    }
                });
            });
        } catch (e) {
            console.error('Tasks Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 11: کوئیک ایکشنز
    // ============================================================
    function initQuickActions() {
        try {
            const actions = document.querySelectorAll('.quick-action-btn');
            const actionMap = {
                'Start Learning': { icon: '📖', msg: 'Redirecting to your learning dashboard...' },
                'Ask AI Mentor': { icon: '🤖', msg: 'Connecting to AI Mentor...' },
                'Browse Courses': { icon: '📚', msg: 'Showing all available courses...' },
                'My Certificates': { icon: '📜', msg: 'Loading your certificates...' }
            };

            actions.forEach((action) => {
                action.addEventListener('click', function() {
                    const label = this.querySelector('.label')?.textContent || 'Action';
                    const data = actionMap[label] || { icon: '⚡', msg: `You clicked "${label}". Coming soon!` };
                    showToast(`${data.icon} ${data.msg}`, 'info');
                    openModal(`⚡ ${label}`, `<p><strong>${label}</strong></p><p>${data.msg}</p>`);
                });
            });
        } catch (e) {
            console.error('Quick Actions Error:', e);
        }
    }

    // ============================================================
    // فیز 12: ویکلی پروگریس
    // ============================================================
    function initWeeklyProgress() {
        try {
            const bars = document.querySelectorAll('.day .bar');
            setTimeout(() => {
                bars.forEach((bar, i) => {
                    const target = bar.style.height;
                    bar.style.height = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        bar.style.height = target;
                    }, 100 + i * 80);
                });
            }, 500);

            bars.forEach(bar => {
                const parent = bar.closest('.day');
                const day = parent?.querySelector('p')?.textContent || 'Day';
                const height = bar.style.height || '0%';
                bar.setAttribute('title', `${day}: ${height}`);
            });
        } catch (e) {
            console.error('Weekly Progress Error:', e);
        }
    }

    // ============================================================
    // فیز 13: ریکنٹ ایکٹیویٹی
    // ============================================================
    function initRecentActivity() {
        try {
            const items = document.querySelectorAll('.activity-item');
            items.forEach((item, i) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-10px)';
                item.style.transition = 'all 0.4s ease';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 300 + i * 150);
            });
        } catch (e) {
            console.error('Recent Activity Error:', e);
        }
    }

    // ============================================================
    // فیز 14: ایکو سسٹم کارڈز
    // ============================================================
    function initEcosystemCards() {
        try {
            const cards = document.querySelectorAll('.ecosystem-card');
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    const title = this.querySelector('h4')?.textContent || 'Card';
                    const icon = this.querySelector('.icon')?.textContent || '🚀';
                    showToast(`${icon} Opening ${title}...`, 'info');
                    openModal(`🚀 ${title}`, `<h3>${icon} ${title}</h3><p>This hub is under development.</p>`);
                });
            });
        } catch (e) {
            console.error('Ecosystem Cards Error:', e);
        }
    }

    // ============================================================
    // فیز 15: نوٹیفکیشنز (ایک بار ڈالنے کا فلاج)
    // ============================================================
    let notificationAdded = false;

    function initNotifications() {
        try {
            const bell = document.getElementById('notificationBell');
            const panel = document.getElementById('notificationPanel');
            const count = document.getElementById('notificationCount');
            const markAllBtn = document.getElementById('markAllReadBtn');
            if (!bell || !panel) return;

            bell.addEventListener('click', function(e) {
                e.stopPropagation();
                panel.classList.toggle('open');
                this.style.transform = 'rotate(20deg) scale(1.2)';
                setTimeout(() => { this.style.transform = ''; }, 300);

                if (panel.classList.contains('open') && !notificationAdded) {
                    const list = panel.querySelector('.notification-list');
                    if (list && count && parseInt(count.textContent) === 0) {
                        const newNotif = document.createElement('div');
                        newNotif.className = 'notification-item unread';
                        newNotif.innerHTML = `
                            <span class="icon">📢</span>
                            <div class="content">
                                <p><strong>New update:</strong> Home page redesigned!</p>
                                <span class="time">Just now</span>
                            </div>
                        `;
                        list.prepend(newNotif);
                        count.textContent = '1';
                        notificationAdded = true;
                    }
                }
            });

            document.addEventListener('click', function(e) {
                if (panel.classList.contains('open') && !panel.contains(e.target) && !bell.contains(e.target)) {
                    panel.classList.remove('open');
                }
            });

            if (markAllBtn) {
                markAllBtn.addEventListener('click', function() {
                    const unread = panel.querySelectorAll('.notification-item.unread');
                    unread.forEach(item => item.classList.remove('unread'));
                    if (count) count.textContent = '0';
                    showToast('✅ All marked as read', 'success');
                });
            }

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && panel.classList.contains('open')) {
                    panel.classList.remove('open');
                }
            });
        } catch (e) {
            console.error('Notifications Error:', e);
        }
    }

    // ============================================================
    // فیز 16: بٹن انجن (Ripple با animation)
    // ============================================================
    function initButtonEngine() {
        try {
            const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .icon-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    // کلک فیڈ بیک
                    this.style.transform = 'scale(0.97)';
                    setTimeout(() => { this.style.transform = ''; }, 150);

                    // Ripple (animation کے ساتھ)
                    let ripple = this.querySelector('.ripple-effect');
                    if (!ripple) {
                        ripple = document.createElement('span');
                        ripple.className = 'ripple-effect';
                        ripple.style.position = 'absolute';
                        ripple.style.borderRadius = '50%';
                        ripple.style.background = 'rgba(255,255,255,0.5)';
                        ripple.style.transform = 'scale(0)';
                        ripple.style.pointerEvents = 'none';
                        ripple.style.animation = 'rippleAnim 0.6s ease-out';
                        this.style.position = 'relative';
                        this.style.overflow = 'hidden';
                        this.appendChild(ripple);
                    }
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
                    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
                    ripple.style.transform = 'scale(1)';
                    ripple.style.opacity = '1';
                    setTimeout(() => {
                        ripple.style.transform = 'scale(0)';
                        ripple.style.opacity = '0';
                    }, 600);
                });
            });

            // Ripple کلید فریمز شامل کریں
            if (!document.getElementById('rippleKeyframes')) {
                const style = document.createElement('style');
                style.id = 'rippleKeyframes';
                style.textContent = `
                    @keyframes rippleAnim {
                        from { transform: scale(0); opacity: 0.5; }
                        to { transform: scale(4); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        } catch (e) {
            console.error('Button Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 17: کارڈز کا فزکس (حقیقی حرکت)
    // ============================================================
    function initCardInteractions() {
        try {
            const cards = document.querySelectorAll(
                '.stat-card, .ecosystem-card, .quick-action-btn, .continue-card, .task-item, .activity-item'
            );
            cards.forEach(el => {
                el.addEventListener('mousedown', function(e) {
                    this.style.transition = 'all 0.1s ease';
                    this.style.transform = 'translateY(-6px) scale(1.02)';
                    this.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                });
                el.addEventListener('mouseup', function(e) {
                    this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                });
                el.addEventListener('mouseleave', function(e) {
                    this.style.transition = 'all 0.3s ease';
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                });
                // Touch events for mobile
                el.addEventListener('touchstart', function(e) {
                    this.style.transition = 'all 0.1s ease';
                    this.style.transform = 'translateY(-6px) scale(1.02)';
                    this.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                });
                el.addEventListener('touchend', function(e) {
                    this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                });
            });
        } catch (e) {
            console.error('Card Interactions Error:', e);
        }
    }

    // ============================================================
    // فیز 18: فوٹر
    // ============================================================
    function initFooterEngine() {
        try {
            const links = document.querySelectorAll('.footer-links a');
            const map = {
                'Theme': '🎨 Theme settings coming soon.',
                'Language': '🌐 Language selection (English, Urdu, Arabic) coming soon!',
                'Support': '🆘 Please email support@scaleflow.edu'
            };
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const text = this.textContent.trim();
                    const msg = map[text] || 'Coming soon!';
                    showToast(`🔗 ${text}`, 'info');
                    openModal(`⚙️ ${text}`, `<p>${msg}</p>`);
                });
            });
        } catch (e) {
            console.error('Footer Engine Error:', e);
        }
    }

    // ============================================================
    // فیز 19: کی بورڈ شارٹ کٹس
    // ============================================================
    function initKeyboardShortcuts() {
        try {
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                    e.preventDefault();
                    const search = document.getElementById('globalSearchInput');
                    if (search) { search.focus(); search.select(); }
                }
                if (e.ctrlKey && e.key === '/') {
                    e.preventDefault();
                    openModal('⌨️ Keyboard Shortcuts', `
                        <ul style="list-style:none;padding:0;">
                            <li><strong>Ctrl+K</strong> — Open Search</li>
                            <li><strong>Ctrl+/</strong> — This Help</li>
                            <li><strong>ESC</strong> — Close Modal / Notifications</li>
                            <li><strong>Enter</strong> — Submit Search</li>
                        </ul>
                    `);
                }
                if (e.key === 'Escape') {
                    const modal = document.getElementById('modal-container');
                    if (modal && modal.classList.contains('open')) closeModal();
                    const panel = document.getElementById('notificationPanel');
                    if (panel && panel.classList.contains('open')) panel.classList.remove('open');
                }
            });
        } catch (e) {
            console.error('Keyboard Shortcuts Error:', e);
        }
    }

    // ============================================================
    // فیز 20: اینیمیشن انجن
    // ============================================================
    function initAnimationEngine() {
        try {
            const bell = document.getElementById('notificationBell');
            if (bell) {
                bell.addEventListener('mouseenter', function() {
                    this.style.transition = 'transform 0.3s ease';
                    this.style.transform = 'rotate(15deg) scale(1.1)';
                });
                bell.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            }
            document.querySelectorAll('.page-section').forEach(s => {
                s.style.animation = 'fadeIn 0.6s ease forwards';
            });
            console.log('🎬 Animation Engine ready.');
        } catch (e) {
            console.error('Animation Engine Error:', e);
        }
    }

    // ============================================================
    // مین انیشیلیزیشن (ہر انجن الگ try میں)
    // ============================================================
    function init() {
        console.log('✅ DOM ready. Initializing modules with error isolation...');

        // سب سے پہلے ٹوسٹ اور موڈل کو گلوبل اسکوپ میں سیٹ کریں
        global.showToast = showToast;
        global.openModal = openModal;
        global.closeModal = closeModal;

        // اب ہر انجن کو الگ try-catch میں چلائیں
        const engines = [
            { name: 'Theme', fn: initThemeEngine },
            { name: 'Navigation', fn: initNavigation },
            { name: 'Hero', fn: initHeroEngine },
            { name: 'Search', fn: initSearchEngine },
            { name: 'Progress', fn: initProgressEngine },
            { name: 'LearningCard', fn: initLearningCardEngine },
            { name: 'Tasks', fn: initTasksEngine },
            { name: 'QuickActions', fn: initQuickActions },
            { name: 'WeeklyProgress', fn: initWeeklyProgress },
            { name: 'RecentActivity', fn: initRecentActivity },
            { name: 'EcosystemCards', fn: initEcosystemCards },
            { name: 'Notifications', fn: initNotifications },
            { name: 'Buttons', fn: initButtonEngine },
            { name: 'CardInteractions', fn: initCardInteractions },
            { name: 'Footer', fn: initFooterEngine },
            { name: 'KeyboardShortcuts', fn: initKeyboardShortcuts },
            { name: 'Animation', fn: initAnimationEngine }
        ];

        engines.forEach(({ name, fn }) => {
            try {
                fn();
                console.log(`✅ ${name} Engine loaded.`);
            } catch (e) {
                console.error(`❌ ${name} Engine failed:`, e);
                // اگر showToast دستیاب ہے تو صارف کو بتائیں
                if (typeof showToast === 'function') {
                    showToast(`⚠️ ${name} module failed to load.`, 'error');
                }
            }
        });

        // گلوبل ScaleFlow آبجیکٹ
        global.ScaleFlow = {
            showToast,
            openModal,
            closeModal,
            navigateTo: global.navigateTo || function() {},
            version: '1.0 (Locked)'
        };

        // خوش آمدید پیغام
        if (typeof showToast === 'function') {
            showToast('🚀 Welcome to ScaleFlow University!', 'info');
        }
        console.log('🔒 Home.js v1.0 is now LOCKED and Production Ready.');
    }

    // ============================================================
    // گلوبل ایرر ہینڈلر (محفوظ)
    // ============================================================
    window.addEventListener('error', function(e) {
        console.error('❌ Global Error:', e.message);
        if (typeof showToast === 'function') {
            showToast('Something went wrong. Please try again.', 'error');
        }
    });

})(window);
