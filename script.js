
/*============================================================
   Sanaullah ScaleFlow University
   script.js — Enterprise Application (All Modules)
   Version: 1.0 (Fixed Selectors)
============================================================*/

(function(global) {
    "use strict";

    // ============================================================
    // 1. APP
    // ============================================================
    const APP = {
        name: 'Sanaullah ScaleFlow University',
        version: '1.0',
        debug: true,
        init: function() {
            console.log(`🚀 ${this.name} v${this.version} loaded`);
            Loader.hide();
            Toast.show('🎓 Welcome to ScaleFlow University', 'success');
            Navigation.init();
            Search.init();
            Dashboard.init();
            Courses.init();
            Learning.init();
            AI.init();
            Certificates.init();
            Achievements.init();
            Marketplace.init();
            Profile.init();
            Settings.init();
            Auth.init();
            Analytics.init();
            Animations.init();
            const yearEl = document.getElementById('currentYear');
            if (yearEl) yearEl.textContent = new Date().getFullYear();
        }
    };

    // ============================================================
    // 2. UI — Toast, Modal, Loader
    // ============================================================
    const UI = {
        toast: function(message, type = 'info') {
            const container = document.getElementById('toast-container');
            if (!container) return;
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            container.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },
        modal: {
            open: function(title, bodyHTML) {
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalBody').innerHTML = bodyHTML;
                document.getElementById('modal-container').classList.add('open');
            },
            close: function() {
                document.getElementById('modal-container').classList.remove('open');
            }
        },
        loader: {
            show: function() {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.remove('hidden');
                    loader.style.display = 'flex';
                }
            },
            hide: function() {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.add('hidden');
                    setTimeout(() => { loader.style.display = 'none'; }, 500);
                }
            }
        }
    };

    // ============================================================
    // 3. NAVIGATION — FIX: HTML میں nav-link نہیں، sidebar-menu a استعمال کریں
    // ============================================================
    const Navigation = {
        init: function() {
            // ✅ مسئلہ 1 حل: .sidebar-menu a استعمال کریں
            document.querySelectorAll('.sidebar-menu a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.dataset.page;
                    if (page) Navigation.goTo(page);
                });
            });
            document.querySelectorAll('.quick-action-btn[data-action]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const map = {
                        'learning': 'page4',
                        'ai': 'page7',
                        'courses': 'page3',
                        'certificates': 'page5'
                    };
                    const page = map[this.dataset.action];
                    if (page) Navigation.goTo(page);
                });
            });
            document.getElementById('continueLearningBtn')?.addEventListener('click', () => Navigation.goTo('page4'));
            document.getElementById('browseCoursesBtn')?.addEventListener('click', () => Navigation.goTo('page3'));
        },
        goTo: function(pageId) {
            document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
            const target = document.getElementById(pageId);
            if (target) target.classList.add('active');
            document.querySelectorAll('.sidebar-menu a').forEach(el => el.classList.remove('active'));
            const activeLink = document.querySelector(`.sidebar-menu a[data-page="${pageId}"]`);
            if (activeLink) activeLink.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.getElementById('notificationPanel')?.classList.remove('open');
        }
    };

    // ============================================================
    // 4. LOADER
    // ============================================================
    const Loader = {
        show: UI.loader.show,
        hide: UI.loader.hide
    };

    // ============================================================
    // 5. TOAST
    // ============================================================
    const Toast = {
        show: UI.toast
    };

    // ============================================================
    // 6. SEARCH
    // ============================================================
    const Search = {
        init: function() {
            const globalSearch = document.getElementById('globalSearchInput');
            if (globalSearch) {
                globalSearch.addEventListener('input', function() {
                    const query = this.value.toLowerCase().trim();
                    const cards = document.querySelectorAll('.gateway-card, .course-card, .product-card');
                    cards.forEach(card => {
                        const text = card.textContent.toLowerCase();
                        card.style.display = text.includes(query) ? 'block' : 'none';
                    });
                });
            }
            const courseSearch = document.getElementById('courseSearchInput');
            if (courseSearch) {
                courseSearch.addEventListener('input', function() {
                    const query = this.value.toLowerCase().trim();
                    document.querySelectorAll('#courseGrid .course-card').forEach(card => {
                        const text = card.textContent.toLowerCase();
                        card.style.display = text.includes(query) ? 'block' : 'none';
                    });
                });
            }
            const marketSearch = document.getElementById('marketplaceSearch');
            if (marketSearch) {
                marketSearch.addEventListener('input', function() {
                    const query = this.value.toLowerCase().trim();
                    document.querySelectorAll('.product-card').forEach(card => {
                        const text = card.textContent.toLowerCase();
                        card.style.display = text.includes(query) ? 'block' : 'none';
                    });
                });
            }
        }
    };

    // ============================================================
    // 7. DASHBOARD
    // ============================================================
    const Dashboard = {
        init: function() {
            const data = {
                name: 'Sanaullah',
                xp: '250 XP',
                level: 'Level 5',
                streak: '7 Days',
                progress: '75%',
                courses: 12,
                certificates: 4,
                achievements: 8,
                projects: 3,
                todayLearning: '65%'
            };
            this.update(data);
        },
        update: function(data) {
            const d = data || {};
            document.getElementById('studentName').textContent = d.name || 'Sanaullah';
            document.getElementById('brainXP').textContent = d.xp || '250 XP';
            document.getElementById('currentLevel').textContent = d.level || 'Level 5';
            document.getElementById('learningStreak').textContent = d.streak || '7 Days';
            document.getElementById('overallProgress').textContent = d.progress || '75%';
            document.getElementById('dashName').textContent = d.name || 'Sanaullah';
            document.getElementById('dashLevel').textContent = (d.level || 'Level 5').replace('Level ', '');
            document.getElementById('dashXP').textContent = d.xp ? d.xp.replace(' XP', '') : '250';
            document.getElementById('dashStreak').textContent = d.streak ? d.streak.replace(' Days', '') : '7';
            document.getElementById('dashCourses').textContent = d.courses || 12;
            document.getElementById('dashCerts').textContent = d.certificates || 4;
            document.getElementById('dashAchievements').textContent = d.achievements || 8;
            document.getElementById('dashProgress').textContent = d.progress || '75%';
            document.getElementById('courseCount').textContent = d.courses || 12;
            document.getElementById('certificateCount').textContent = d.certificates || 4;
            document.getElementById('achievementCount').textContent = d.achievements || 8;
            document.getElementById('projectCount').textContent = d.projects || 3;
            document.getElementById('sidebarXP').textContent = d.xp || '250 XP';
            document.getElementById('sidebarUserName').textContent = d.name || 'Sanaullah';
            document.getElementById('sidebarUserLevel').textContent = (d.level || 'Level 5') + ' • Advanced';
            const progress = parseInt(d.progress) || 65;
            document.getElementById('continueProgress').style.width = progress + '%';
            document.getElementById('progressText').textContent = progress + '% Complete';
        }
    };

    // ============================================================
    // 8. COURSES — FIX: .filter-btn نہیں، .filter-buttons .btn-secondary استعمال کریں
    // ============================================================
    const Courses = {
        init: function() {
            // ✅ مسئلہ 2 حل: .filter-buttons .btn-secondary
            document.querySelectorAll('.filter-buttons .btn-secondary').forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.dataset.filter;
                    document.querySelectorAll('#courseGrid .course-card').forEach(card => {
                        const diff = card.dataset.difficulty || 'all';
                        card.style.display = (filter === 'all' || diff === filter) ? 'block' : 'none';
                    });
                    Toast.show('Filter: ' + filter, 'info');
                });
            });
            document.querySelectorAll('.course-start, .course-enroll').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    Navigation.goTo('page4');
                });
            });
            document.querySelectorAll('.pagination-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    Toast.show('Pagination: ' + this.textContent, 'info');
                });
            });
        }
    };

    // ============================================================
    // 9. LEARNING — FIX: کلاسز کی بجائے IDs استعمال کریں
    // ============================================================
    const Learning = {
        init: function() {
            // ✅ مسئلہ 3 حل: IDs کے مطابق
            document.getElementById('continueProgressBtn')?.addEventListener('click', function() {
                const fill = document.getElementById('continueProgress');
                const text = document.getElementById('progressText');
                let progress = parseInt(fill.style.width) || 65;
                if (progress >= 100) {
                    Toast.show('🎉 Course Complete!', 'success');
                    return;
                }
                progress = Math.min(progress + 5, 100);
                fill.style.width = progress + '%';
                text.textContent = progress + '% Complete';
                Toast.show('📈 Progress updated to ' + progress + '%', 'info');
            });
            document.getElementById('saveNotesBtn')?.addEventListener('click', function() {
                const notes = document.getElementById('notesInput')?.value;
                if (notes) {
                    Toast.show('✅ Notes saved!', 'success');
                } else {
                    Toast.show('⚠️ Please write some notes.', 'warning');
                }
            });
            document.getElementById('getReflectionBtn')?.addEventListener('click', function() {
                const input = document.getElementById('reflectionInput');
                if (input && input.value.trim()) {
                    Toast.show('🤖 Reflection received! Check AI response.', 'info');
                } else {
                    Toast.show('⚠️ Please type your reflection.', 'warning');
                }
            });
            document.getElementById('submitQuizBtn')?.addEventListener('click', function() {
                const input = document.getElementById('quizAnswerInput');
                if (input && input.value.trim()) {
                    Toast.show('✅ Quiz submitted!', 'success');
                } else {
                    Toast.show('⚠️ Please provide an answer.', 'warning');
                }
            });
            document.getElementById('prevLessonBtn')?.addEventListener('click', function() {
                Toast.show('◀ Previous lesson', 'info');
            });
            document.getElementById('nextLessonBtn')?.addEventListener('click', function() {
                Toast.show('▶ Next lesson', 'info');
            });
            document.querySelector('.pdf-viewer .btn-secondary')?.addEventListener('click', function() {
                Toast.show('📄 Downloading PDF...', 'info');
            });
        }
    };

    // ============================================================
    // 10. AI — FIX: .prompt-btn کی بجائے IDs استعمال کریں
    // ============================================================
    const AI = {
        init: function() {
            const messages = document.getElementById('chatMessages');
            const input = document.getElementById('chatInput');
            const sendBtn = document.getElementById('chatSendBtn');
            const clearBtn = document.getElementById('chatClearBtn');
            const voiceBtn = document.getElementById('chatVoiceBtn');

            if (sendBtn && input) {
                sendBtn.addEventListener('click', function() {
                    const msg = input.value.trim();
                    if (!msg) return;
                    const userMsg = document.createElement('div');
                    userMsg.className = 'message user';
                    userMsg.textContent = msg;
                    messages.appendChild(userMsg);
                    input.value = '';
                    messages.scrollTop = messages.scrollHeight;
                    setTimeout(() => {
                        const aiMsg = document.createElement('div');
                        aiMsg.className = 'message ai';
                        aiMsg.textContent = '🤖 Thanks for your message! I will get back to you shortly.';
                        messages.appendChild(aiMsg);
                        messages.scrollTop = messages.scrollHeight;
                    }, 500);
                });
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') sendBtn.click();
                });
            }
            if (clearBtn) {
                clearBtn.addEventListener('click', function() {
                    messages.innerHTML = '';
                    const welcome = document.createElement('div');
                    welcome.className = 'message ai';
                    welcome.textContent = 'Hello! How can I assist you today?';
                    messages.appendChild(welcome);
                    Toast.show('Chat history cleared', 'warning');
                });
            }
            if (voiceBtn) {
                voiceBtn.addEventListener('click', function() {
                    Toast.show('🎤 Voice input activated (demo)', 'info');
                });
            }
            // ✅ مسئلہ 4 حل: IDs کے مطابق
            document.getElementById('promptClosure')?.addEventListener('click', function() {
                if (input) { input.value = 'Explain closures in JavaScript.'; input.focus(); }
            });
            document.getElementById('promptHoisting')?.addEventListener('click', function() {
                if (input) { input.value = 'What is hoisting?'; input.focus(); }
            });
            document.getElementById('promptAsync')?.addEventListener('click', function() {
                if (input) { input.value = 'Help with async/await.'; input.focus(); }
            });
        }
    };

    // ============================================================
    // 11. CERTIFICATES — FIX: .cert-download کی بجائے IDs استعمال کریں
    // ============================================================
    const Certificates = {
        init: function() {
            // ✅ مسئلہ 6 حل: IDs کے مطابق
            const actions = [
                'certDownload1', 'certVerify1', 'certQR1', 'certShare1',
                'certDownload2', 'certVerify2', 'certQR2', 'certShare2'
            ];
            actions.forEach(id => {
                document.getElementById(id)?.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const action = this.textContent.trim();
                    Toast.show('📄 ' + action + ' clicked', 'info');
                });
            });
        }
    };

    // ============================================================
    // 12. ACHIEVEMENTS
    // ============================================================
    const Achievements = {
        init: function() {
            document.querySelectorAll('.achievement-card').forEach(card => {
                card.addEventListener('click', function() {
                    const name = this.querySelector('h4')?.textContent || 'Achievement';
                    const status = this.classList.contains('locked') ? '🔒 Locked' : '✅ Earned';
                    UI.modal.open(name, '<p>Status: ' + status + '</p><p>Details about this achievement.</p>');
                });
            });
        }
    };

    // ============================================================
    // 13. MARKETPLACE — FIX: .add-to-cart کی بجائے IDs استعمال کریں
    // ============================================================
    const Marketplace = {
        init: function() {
            document.getElementById('marketplaceCart')?.addEventListener('click', function() {
                Toast.show('🛒 Cart opened (0 items)', 'info');
            });
            document.getElementById('marketplaceCheckout')?.addEventListener('click', function() {
                Toast.show('💳 Checkout initiated', 'success');
            });
            // ✅ مسئلہ 5 حل: IDs کے مطابق
            ['addToCart1', 'addToCart2', 'addToCart3'].forEach(id => {
                document.getElementById(id)?.addEventListener('click', function(e) {
                    e.stopPropagation();
                    Toast.show('✅ Added to cart!', 'success');
                });
            });
            document.getElementById('marketplaceCategories')?.addEventListener('click', function() {
                Toast.show('📂 Categories', 'info');
            });
        }
    };

    // ============================================================
    // 14. PROFILE
    // ============================================================
    const Profile = {
        init: function() {
            document.getElementById('editProfileBtn')?.addEventListener('click', function() {
                UI.modal.open('✏️ Edit Profile',
                    '<form id="profileEditForm"><div class="form-group"><label>Full Name</label><input type="text" value="Sanaullah" id="editName"></div><div class="form-group"><label>Email</label><input type="email" value="sanaullah@university.com" id="editEmail"></div><button type="submit" class="btn-primary">Save Changes</button></form>'
                );
                document.getElementById('profileEditForm')?.addEventListener('submit', function(e) {
                    e.preventDefault();
                    Toast.show('✅ Profile updated!', 'success');
                    UI.modal.close();
                });
            });
        }
    };

    // ============================================================
    // 15. SETTINGS
    // ============================================================
    const Settings = {
        init: function() {
            document.getElementById('settingsThemeBtn')?.addEventListener('click', function() {
                if (typeof toggleDarkMode === 'function') toggleDarkMode();
                else {
                    document.body.classList.toggle('dark-mode');
                    const isDark = document.body.classList.contains('dark-mode');
                    document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    Toast.show(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
                }
            });
            document.getElementById('settingsLanguage')?.addEventListener('change', function() {
                Toast.show('🌐 Language set to ' + this.value, 'info');
            });
            document.getElementById('settingsChangePassword')?.addEventListener('click', function() {
                UI.modal.open('🔐 Change Password',
                    '<form id="changePwdForm"><div class="form-group"><label>Current Password</label><input type="password" placeholder="••••••••"></div><div class="form-group"><label>New Password</label><input type="password" placeholder="••••••••"></div><div class="form-group"><label>Confirm Password</label><input type="password" placeholder="••••••••"></div><button type="submit" class="btn-primary">Update Password</button></form>'
                );
            });
            document.getElementById('settingsEnable2FA')?.addEventListener('click', function() {
                Toast.show('✅ Two-Factor Authentication enabled!', 'success');
            });
            document.getElementById('settingsBackupBtn')?.addEventListener('click', function() {
                Toast.show('💾 Backup started...', 'info');
                setTimeout(() => Toast.show('✅ Backup completed!', 'success'), 2000);
            });
            document.querySelectorAll('#notifEmail, #notifPush, #notifSMS').forEach(cb => {
                cb.addEventListener('change', function() {
                    Toast.show('🔔 Notification setting updated', 'info');
                });
            });
        }
    };

    // ============================================================
    // 16. AUTH
    // ============================================================
    const Auth = {
        init: function() {
            document.getElementById('loginForm')?.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value.trim();
                if (!email || !password) {
                    Toast.show('⚠️ Please fill in both fields.', 'warning');
                    return;
                }
                if (!email.includes('@')) {
                    Toast.show('⚠️ Please enter a valid email address.', 'warning');
                    return;
                }
                if (password.length < 6) {
                    Toast.show('⚠️ Password must be at least 6 characters.', 'warning');
                    return;
                }
                Toast.show('✅ Login successful! Redirecting...', 'success');
                setTimeout(() => Navigation.goTo('page1'), 1500);
            });
            document.getElementById('forgotPasswordLink')?.addEventListener('click', function(e) {
                e.preventDefault();
                UI.modal.open('🔑 Forgot Password',
                    '<p>Enter your email to receive OTP.</p><input type="email" placeholder="student@university.com" style="width:100%;padding:12px;border-radius:12px;border:2px solid var(--border);margin:12px 0;"><button id="otpSendBtn" class="btn-primary" type="button">Send OTP</button>'
                );
                document.getElementById('otpSendBtn')?.addEventListener('click', function() {
                    Toast.show('📧 OTP sent to your email!', 'success');
                    UI.modal.close();
                });
            });
            document.getElementById('registerLink')?.addEventListener('click', function(e) {
                e.preventDefault();
                UI.modal.open('📝 Register',
                    '<form id="registerForm"><div class="form-group"><label>Full Name</label><input type="text" placeholder="Sanaullah"></div><div class="form-group"><label>Email</label><input type="email" placeholder="student@university.com"></div><div class="form-group"><label>Password</label><input type="password" placeholder="••••••••"></div><button type="submit" class="btn-primary">Create Account</button></form>'
                );
                document.getElementById('registerForm')?.addEventListener('submit', function(e) {
                    e.preventDefault();
                    Toast.show('✅ Account created! Please login.', 'success');
                    UI.modal.close();
                });
            });
            document.getElementById('loginOTPBtn')?.addEventListener('click', function() {
                Toast.show('📧 OTP sent to your email!', 'info');
            });
        }
    };

    // ============================================================
    // 17. API
    // ============================================================
    const API = {
        baseUrl: '',
        get: function(endpoint) {
            return fetch(this.baseUrl + endpoint)
                .then(res => res.json())
                .catch(err => {
                    console.error('API Error:', err);
                    return null;
                });
        },
        post: function(endpoint, data) {
            return fetch(this.baseUrl + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .catch(err => {
                console.error('API Error:', err);
                return null;
            });
        }
    };

    // ============================================================
    // 18. ANALYTICS
    // ============================================================
    const Analytics = {
        init: function() {
            console.log('📊 Analytics initialized');
        },
        track: function(event, data) {
            console.log('📊 Event:', event, data);
        }
    };

    // ============================================================
    // 19. ANIMATIONS
    // ============================================================
    const Animations = {
        init: function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.gateway-card, .course-card, .achievement-card, .stat-box').forEach(el => {
                observer.observe(el);
            });
            document.querySelectorAll('.btn-primary, .btn-secondary, .quick-btn, .quick-action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => { this.style.transform = ''; }, 150);
                });
            });
        }
    };

    // ============================================================
    // 20. DARK MODE
    // ============================================================
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        Toast.show(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }

    (function loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeBtn').textContent = '☀️';
        }
    })();

    document.getElementById('darkModeBtn')?.addEventListener('click', toggleDarkMode);

    // ============================================================
    // 21. SCROLL TOP
    // ============================================================
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // 22. NOTIFICATION PANEL
    // ============================================================
    document.getElementById('notificationBell')?.addEventListener('click', function() {
        document.getElementById('notificationPanel')?.classList.toggle('open');
    });
    document.getElementById('markAllReadBtn')?.addEventListener('click', function() {
        document.querySelectorAll('.notification-item.unread').forEach(item => item.classList.remove('unread'));
        document.getElementById('notificationCount').textContent = '0';
        Toast.show('✅ All notifications marked as read', 'success');
    });

    // ============================================================
    // 23. KEYBOARD SHORTCUTS
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const search = document.getElementById('globalSearchInput');
            if (search) search.focus();
        }
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal-container');
            if (modal.classList.contains('open')) UI.modal.close();
            const panel = document.getElementById('notificationPanel');
            if (panel.classList.contains('open')) panel.classList.remove('open');
        }
    });

    // ============================================================
    // 24. INIT
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            APP.init();
        });
    } else {
        APP.init();
    }

    // ============================================================
    // 25. GLOBAL
    // ============================================================
    global.ScaleFlow = {
        APP,
        UI,
        Navigation,
        Loader,
        Toast,
        Search,
        Dashboard,
        Courses,
        Learning,
        AI,
        Certificates,
        Achievements,
        Marketplace,
        Profile,
        Settings,
        Auth,
        API,
        Analytics,
        Animations,
        toggleDarkMode
    };

   /*============================================================
   Sanaullah ScaleFlow University
   script.js — Complete Enterprise JavaScript
   Version: 1.0
   اس میں تمام فیچرز شامل ہیں جو HTML اور CSS کے مطابق ہیں۔
   کوئی بھی چیز چھوٹی نہیں کی گئی۔
============================================================*/

(function(global) {
    "use strict";

    // ================================================================
    // 1. APP — مین کنٹرولر
    // ================================================================
    const App = {
        config: {
            name: 'Sanaullah ScaleFlow University',
            version: '1.0',
            debug: true
        },
        init: function() {
            console.log(`🚀 ${this.config.name} v${this.config.version} started`);

            // تمام ماڈیولز کو انیشیئلائز کریں
            Loader.hide();
            Theme.load();
            Navigation.init();
            Toast.init();
            Modal.init();
            Settings.init();
            Security.init();
            AIMentor.init();
            Feedback.init();
            ThreeD.init();
            CV.init();
            Notifications.init();

            // سال خودکار اپ ڈیٹ
            const yearEl = document.getElementById('currentYear');
            if (yearEl) yearEl.textContent = new Date().getFullYear();

            // خوش آمدید
            Toast.show('🎓 Welcome to ScaleFlow University', 'success');

            // ڈارک موڈ بٹن
            document.getElementById('darkModeBtn')?.addEventListener('click', Theme.toggle);

            // اسکرول ٹاپ بٹن
            ScrollTop.init();

            // کی بورڈ شارٹ کٹس
            Keyboard.init();

            console.log('✅ App initialized successfully');
        }
    };

    // ================================================================
    // 2. LOADER
    // ================================================================
    const Loader = {
        element: document.getElementById('loader'),
        show: function() {
            if (this.element) {
                this.element.classList.remove('hidden');
                this.element.style.display = 'flex';
            }
        },
        hide: function() {
            if (this.element) {
                this.element.classList.add('hidden');
                setTimeout(() => {
                    this.element.style.display = 'none';
                }, 500);
            }
        }
    };

    // ================================================================
    // 3. TOAST
    // ================================================================
    const Toast = {
        container: document.getElementById('toast-container'),
        init: function() {
            // کوئی خاص انیشیئلائزیشن نہیں
        },
        show: function(message, type = 'info') {
            if (!this.container) return;
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            this.container.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };

    // ================================================================
    // 4. MODAL
    // ================================================================
    const Modal = {
        container: document.getElementById('modal-container'),
        title: document.getElementById('modalTitle'),
        body: document.getElementById('modalBody'),
        init: function() {
            document.getElementById('modalCloseBtn')?.addEventListener('click', () => this.close());
            document.getElementById('modalCancelBtn')?.addEventListener('click', () => this.close());
            document.getElementById('modalConfirmBtn')?.addEventListener('click', () => {
                Toast.show('✅ Confirmed!', 'success');
                this.close();
            });
            this.container?.addEventListener('click', (e) => {
                if (e.target === this.container) this.close();
            });
        },
        open: function(title, bodyHTML) {
            this.title.textContent = title;
            this.body.innerHTML = bodyHTML;
            this.container.classList.add('open');
            document.body.style.overflow = 'hidden';
        },
        close: function() {
            this.container.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    // ================================================================
    // 5. THEME (Dark/Light)
    // ================================================================
    const Theme = {
        btn: document.getElementById('darkModeBtn'),
        load: function() {
            const saved = localStorage.getItem('theme');
            if (saved === 'dark') {
                document.body.classList.add('dark-mode');
                if (this.btn) this.btn.textContent = '☀️';
            }
            // System theme buttons
            document.getElementById('settingsThemeLight')?.addEventListener('click', () => this.set('light'));
            document.getElementById('settingsThemeDark')?.addEventListener('click', () => this.set('dark'));
            document.getElementById('settingsThemeSystem')?.addEventListener('click', () => this.set('system'));
        },
        toggle: function() {
            const isDark = document.body.classList.toggle('dark-mode');
            const mode = isDark ? 'dark' : 'light';
            this.btn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', mode);
            Toast.show(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
        },
        set: function(mode) {
            if (mode === 'dark') {
                document.body.classList.add('dark-mode');
                this.btn.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else if (mode === 'light') {
                document.body.classList.remove('dark-mode');
                this.btn.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                // system
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.body.classList.toggle('dark-mode', prefersDark);
                this.btn.textContent = prefersDark ? '☀️' : '🌙';
                localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
            }
            Toast.show(`Theme set to ${mode}`, 'info');
        }
    };

    // ================================================================
    // 6. NAVIGATION (Responsive Sidebar)
    // ================================================================
    const Navigation = {
        init: function() {
            const links = document.querySelectorAll('.sidebar-menu a');
            const sections = document.querySelectorAll('.page-section');
            const sidebar = document.getElementById('mainSidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const menuToggle = document.getElementById('menuToggle');
            const closeBtn = document.getElementById('sidebarClose');

            // Sidebar toggle
            menuToggle?.addEventListener('click', function() {
                const isOpen = sidebar.classList.toggle('open');
                overlay.classList.toggle('active');
                this.setAttribute('aria-expanded', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });

            // Close sidebar
            const closeSidebar = () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            };

            closeBtn?.addEventListener('click', closeSidebar);
            overlay?.addEventListener('click', closeSidebar);

            // Navigation links
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.dataset.page;
                    // Hide all sections
                    sections.forEach(el => el.classList.remove('active'));
                    const target = document.getElementById(page);
                    if (target) target.classList.add('active');
                    // Update active link
                    links.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    // Close sidebar on mobile
                    closeSidebar();
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });

            // Close sidebar on resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 992 && sidebar.classList.contains('open')) {
                    closeSidebar();
                }
            });
        }
    };

    // ================================================================
    // 7. SCROLL TOP
    // ================================================================
    const ScrollTop = {
        btn: document.getElementById('scrollTopBtn'),
        init: function() {
            if (!this.btn) return;
            window.addEventListener('scroll', () => {
                this.btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
            });
            this.btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    // ================================================================
    // 8. KEYBOARD SHORTCUTS
    // ================================================================
    const Keyboard = {
        init: function() {
            document.addEventListener('keydown', function(e) {
                // Ctrl+K → focus search
                if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                    e.preventDefault();
                    const search = document.getElementById('globalSearchInput');
                    if (search) search.focus();
                }
                // Escape → close modal, notification panel, sidebar
                if (e.key === 'Escape') {
                    // Close modal
                    if (document.getElementById('modal-container').classList.contains('open')) {
                        Modal.close();
                    }
                    // Close notification panel
                    const panel = document.getElementById('notificationPanel');
                    if (panel && panel.classList.contains('open')) {
                        panel.classList.remove('open');
                    }
                    // Close sidebar
                    const sidebar = document.getElementById('mainSidebar');
                    if (sidebar && sidebar.classList.contains('open')) {
                        sidebar.classList.remove('open');
                        document.getElementById('sidebarOverlay').classList.remove('active');
                        document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                }
            });
        }
    };

    // ================================================================
    // 9. NOTIFICATIONS
    // ================================================================
    const Notifications = {
        init: function() {
            const bell = document.getElementById('notificationBell');
            const panel = document.getElementById('notificationPanel');
            const markAll = document.getElementById('markAllReadBtn');

            bell?.addEventListener('click', function(e) {
                e.stopPropagation();
                panel.classList.toggle('open');
            });

            // Close panel when clicking outside
            document.addEventListener('click', function(e) {
                if (panel && !panel.contains(e.target) && !bell.contains(e.target)) {
                    panel.classList.remove('open');
                }
            });

            markAll?.addEventListener('click', function() {
                document.querySelectorAll('.notification-item.unread').forEach(item => {
                    item.classList.remove('unread');
                });
                document.getElementById('notificationCount').textContent = '0';
                Toast.show('✅ All notifications marked as read', 'success');
            });
        }
    };

    // ================================================================
    // 10. SETTINGS MODULE
    // ================================================================
    const Settings = {
        init: function() {
            // Language
            document.getElementById('settingsLanguageSave')?.addEventListener('click', function() {
                const lang = document.getElementById('settingsLanguage').value;
                Toast.show(`🌐 Language set to ${lang}`, 'info');
            });

            // Accessibility
            document.getElementById('accSave')?.addEventListener('click', function() {
                Toast.show('♿ Accessibility settings saved', 'success');
            });

            // Notifications
            document.getElementById('notifSave')?.addEventListener('click', function() {
                Toast.show('🔔 Notification settings saved', 'success');
            });

            // Privacy
            document.getElementById('privSave')?.addEventListener('click', function() {
                Toast.show('🛡️ Privacy settings saved', 'success');
            });

            // AI Preferences
            document.getElementById('aiPrefSave')?.addEventListener('click', function() {
                Toast.show('🤖 AI preferences saved', 'success');
            });

            // Backup
            document.getElementById('backupNow')?.addEventListener('click', function() {
                Toast.show('💾 Backup started...', 'info');
                setTimeout(() => Toast.show('✅ Backup completed!', 'success'), 2000);
            });
            document.getElementById('restoreBackup')?.addEventListener('click', function() {
                Toast.show('🔄 Restore started...', 'info');
            });

            // Export Data
            document.getElementById('exportData')?.addEventListener('click', function() {
                Toast.show('📤 Exporting all data...', 'info');
            });
            document.getElementById('exportSettings')?.addEventListener('click', function() {
                Toast.show('📤 Exporting settings...', 'info');
            });

            // Connected Accounts
            document.getElementById('connectGoogle')?.addEventListener('click', function() {
                document.getElementById('googleStatus').textContent = 'Connected';
                Toast.show('✅ Google connected', 'success');
            });
            document.getElementById('disconnectGitHub')?.addEventListener('click', function() {
                document.getElementById('githubStatus').textContent = 'Not connected';
                Toast.show('🔓 GitHub disconnected', 'info');
            });
            document.getElementById('connectLinkedIn')?.addEventListener('click', function() {
                document.getElementById('linkedinStatus').textContent = 'Connected';
                Toast.show('✅ LinkedIn connected', 'success');
            });

            // Personalization
            document.getElementById('personalizationSave')?.addEventListener('click', function() {
                const style = document.getElementById('learnStyle').value;
                const goal = document.getElementById('dailyGoal').value;
                Toast.show(`🎯 Personalization saved: ${style}, ${goal} min`, 'success');
            });
        }
    };

    // ================================================================
    // 11. SECURITY MODULE
    // ================================================================
    const Security = {
        init: function() {
            // Password strength meter
            const newPwd = document.getElementById('secNewPwd');
            const strengthText = document.getElementById('pwdStrengthText');
            newPwd?.addEventListener('input', function() {
                const val = this.value;
                let strength = 'Weak';
                if (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val) &&
                    /\d/.test(val) && /[^A-Za-z0-9]/.test(val)) {
                    strength = 'Strong';
                } else if (val.length >= 6 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val)) {
                    strength = 'Medium';
                }
                strengthText.textContent = strength;
            });

            // Change Password
            document.getElementById('secChangePwdBtn')?.addEventListener('click', function() {
                const current = document.getElementById('secCurrentPwd').value;
                const newP = document.getElementById('secNewPwd').value;
                const confirm = document.getElementById('secConfirmPwd').value;
                if (!current || !newP || !confirm) {
                    Toast.show('⚠️ Please fill all fields', 'warning');
                    return;
                }
                if (newP !== confirm) {
                    Toast.show('⚠️ Passwords do not match', 'warning');
                    return;
                }
                if (newP.length < 8) {
                    Toast.show('⚠️ Password must be at least 8 characters', 'warning');
                    return;
                }
                Toast.show('✅ Password updated successfully!', 'success');
            });

            // 2FA
            document.getElementById('secEnable2FA')?.addEventListener('click', function() {
                document.getElementById('sec2FAStatus').textContent = 'Enabled';
                document.getElementById('sec2FABackupCodes').style.display = 'block';
                Toast.show('✅ 2FA enabled!', 'success');
            });
            document.getElementById('secDisable2FA')?.addEventListener('click', function() {
                document.getElementById('sec2FAStatus').textContent = 'Disabled';
                document.getElementById('sec2FABackupCodes').style.display = 'none';
                Toast.show('🔓 2FA disabled', 'info');
            });
            document.getElementById('secRegenerateCodes')?.addEventListener('click', function() {
                document.getElementById('secBackupCodes').textContent =
                    Math.floor(1000 + Math.random() * 9000) + '-' +
                    Math.floor(1000 + Math.random() * 9000) + '-' +
                    Math.floor(1000 + Math.random() * 9000);
                Toast.show('🔄 Backup codes regenerated', 'info');
            });

            // Face Login
            document.getElementById('secFaceSetup')?.addEventListener('click', function() {
                document.getElementById('secFaceStatus').textContent = 'Configured';
                Toast.show('👤 Face login configured!', 'success');
            });
            document.getElementById('secFaceRemove')?.addEventListener('click', function() {
                document.getElementById('secFaceStatus').textContent = 'Not configured';
                Toast.show('👤 Face login removed', 'info');
            });

            // Fingerprint
            document.getElementById('secFingerprintSetup')?.addEventListener('click', function() {
                document.getElementById('secFingerprintStatus').textContent = 'Configured';
                Toast.show('🖐️ Fingerprint configured!', 'success');
            });
            document.getElementById('secFingerprintRemove')?.addEventListener('click', function() {
                document.getElementById('secFingerprintStatus').textContent = 'Not configured';
                Toast.show('🖐️ Fingerprint removed', 'info');
            });

            // Device Manager
            document.getElementById('secRemoveCurrent')?.addEventListener('click', function() {
                Toast.show('⚠️ Current device removed', 'warning');
            });
            document.getElementById('secRemoveMobile')?.addEventListener('click', function() {
                Toast.show('📱 Mobile device removed', 'info');
            });
            document.getElementById('secAddDevice')?.addEventListener('click', function() {
                Toast.show('✅ Trusted device added', 'success');
            });

            // Active Sessions
            document.getElementById('secEndCurrent')?.addEventListener('click', function() {
                Toast.show('⚠️ Current session ended', 'warning');
            });
            document.getElementById('secEndMobile')?.addEventListener('click', function() {
                Toast.show('📱 Mobile session ended', 'info');
            });
            document.getElementById('secEndAll')?.addEventListener('click', function() {
                Toast.show('🔄 All sessions ended', 'info');
            });

            // Login History
            document.getElementById('secClearHistory')?.addEventListener('click', function() {
                Toast.show('🗑️ Login history cleared', 'info');
            });

            // Emergency Lock
            document.getElementById('secEmergencyLock')?.addEventListener('click', function() {
                if (confirm('⚠️ Are you sure you want to lock your account?')) {
                    document.getElementById('secLockStatus').textContent = 'Locked';
                    Toast.show('🛑 Account locked! All sessions ended.', 'error');
                }
            });

            // OTP & Recovery
            document.getElementById('secSaveRecovery')?.addEventListener('click', function() {
                const email = document.getElementById('secRecoveryEmail').value;
                if (email) {
                    Toast.show('📧 Recovery email saved: ' + email, 'success');
                } else {
                    Toast.show('⚠️ Please enter a valid email', 'warning');
                }
            });
            document.getElementById('secSendOTP')?.addEventListener('click', function() {
                Toast.show('📧 OTP sent to your recovery email', 'info');
            });

            // AI Threat Detection
            document.getElementById('secScanNow')?.addEventListener('click', function() {
                Toast.show('🔍 Scanning for threats...', 'info');
                setTimeout(() => Toast.show('✅ Scan complete: No threats found', 'success'), 2000);
            });
            document.getElementById('secViewThreats')?.addEventListener('click', function() {
                Toast.show('🛡️ No threats detected', 'info');
            });
        }
    };

    // ================================================================
    // 12. AI MENTOR MODULE
    // ================================================================
    const AIMentor = {
        messages: document.getElementById('aiChatMessages'),
        input: document.getElementById('aiChatInput'),
        memory: [],
        init: function() {
            // Chat send
            document.getElementById('aiChatSend')?.addEventListener('click', () => this.sendMessage());
            this.input?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });

            // Suggestions
            document.querySelectorAll('.ai-suggestion').forEach(btn => {
                btn.addEventListener('click', function() {
                    AIMentor.input.value = this.dataset.text;
                    AIMentor.sendMessage();
                });
            });

            // Voice
            document.getElementById('aiChatVoice')?.addEventListener('click', function() {
                Toast.show('🎤 Voice input activated (demo)', 'info');
            });

            // Clear chat
            document.getElementById('aiChatClear')?.addEventListener('click', function() {
                AIMentor.messages.innerHTML = '';
                const welcome = document.createElement('div');
                welcome.className = 'message ai';
                welcome.textContent = 'Hello! I\'m your AI Mentor. How can I help you today?';
                AIMentor.messages.appendChild(welcome);
                Toast.show('Chat cleared', 'info');
            });

            // Memory
            document.getElementById('aiMemoryView')?.addEventListener('click', function() {
                Toast.show('🧠 Memory: ' + (AIMentor.memory.length || 'Empty'), 'info');
            });
            document.getElementById('aiMemoryClear')?.addEventListener('click', function() {
                AIMentor.memory = [];
                Toast.show('🧠 Memory cleared', 'info');
            });

            // AI Features (all with toasts)
            const aiActions = [
                'aiHistoryDetails', 'aiWeaknessAction',
                'aiHomeworkCheck', 'aiQuizGenerate', 'aiQuizExplain',
                'aiCodeHelp', 'aiCodeReview', 'aiCareerPath', 'aiCareerSkills',
                'aiVoiceStart', 'aiVoiceStop', 'aiImageAnalyze', 'aiPDFRead',
                'aiHistoryClear', 'aiPersonalitySave', 'aiLanguageSave',
                'aiTeacherStart', 'aiTeacherStop'
            ];
            aiActions.forEach(id => {
                document.getElementById(id)?.addEventListener('click', function() {
                    const label = this.textContent.trim() || 'Feature';
                    Toast.show(`🤖 ${label} (demo)`, 'info');
                });
            });

            // Mood
            document.getElementById('aiMoodHappy')?.addEventListener('click', function() {
                document.getElementById('aiMoodCurrent').textContent = 'Happy';
                Toast.show('😊 AI mood: Happy', 'info');
            });
            document.getElementById('aiMoodSerious')?.addEventListener('click', function() {
                document.getElementById('aiMoodCurrent').textContent = 'Serious';
                Toast.show('😐 AI mood: Serious', 'info');
            });
            document.getElementById('aiMoodEncouraging')?.addEventListener('click', function() {
                document.getElementById('aiMoodCurrent').textContent = 'Encouraging';
                Toast.show('💪 AI mood: Encouraging', 'info');
            });

            // Reflection
            document.getElementById('aiReflectionSubmit')?.addEventListener('click', function() {
                const input = document.getElementById('aiReflectionInput');
                if (input && input.value.trim()) {
                    document.getElementById('aiReflectionResult').innerHTML =
                        '<p>🤖 AI Reflection: "Great job! Keep up the learning momentum!"</p>';
                    Toast.show('🤔 Reflection received!', 'success');
                    input.value = '';
                } else {
                    Toast.show('⚠️ Please type your reflection', 'warning');
                }
            });
        },
        sendMessage: function() {
            const msg = this.input.value.trim();
            if (!msg) return;
            // User message
            const userMsg = document.createElement('div');
            userMsg.className = 'message user';
            userMsg.textContent = msg;
            this.messages.appendChild(userMsg);
            this.memory.push({ role: 'user', text: msg });
            this.input.value = '';
            this.messages.scrollTop = this.messages.scrollHeight;

            // Simulate AI response
            setTimeout(() => {
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai';
                const responses = [
                    '🤖 That\'s a great question! Let me think about it...',
                    '🤖 I understand. Here\'s what I can help you with.',
                    '🤖 Good point! Let me explain it step by step.',
                    '🤖 Excellent! You\'re on the right track.'
                ];
                aiMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
                this.messages.appendChild(aiMsg);
                this.memory.push({ role: 'ai', text: aiMsg.textContent });
                this.messages.scrollTop = this.messages.scrollHeight;
            }, 600);
        }
    };

    // ================================================================
    // 13. FEEDBACK MODULE
    // ================================================================
    const Feedback = {
        init: function() {
            // Ticket System
            document.getElementById('fbNewTicket')?.addEventListener('click', function() {
                Toast.show('🎫 New ticket created!', 'success');
            });
            document.getElementById('fbViewTicket1')?.addEventListener('click', function() {
                Toast.show('📄 Viewing ticket #TKT-001', 'info');
            });
            document.getElementById('fbViewTicket2')?.addEventListener('click', function() {
                Toast.show('📄 Viewing ticket #TKT-002', 'info');
            });
            document.getElementById('fbAllTickets')?.addEventListener('click', function() {
                Toast.show('📋 Showing all tickets', 'info');
            });

            // AI Auto Reply
            document.getElementById('fbAutoReply')?.addEventListener('change', function() {
                Toast.show('🤖 AI Auto Reply ' + (this.checked ? 'enabled' : 'disabled'), 'info');
            });

            // WhatsApp
            document.getElementById('fbWhatsApp')?.addEventListener('click', function() {
                Toast.show('📱 Opening WhatsApp...', 'info');
            });

            // Email Support
            document.getElementById('fbEmailSend')?.addEventListener('click', function() {
                const subject = document.getElementById('fbEmailSubject').value.trim();
                const body = document.getElementById('fbEmailBody').value.trim();
                if (!subject || !body) {
                    Toast.show('⚠️ Please fill in all fields', 'warning');
                    return;
                }
                Toast.show('📧 Email sent to support!', 'success');
            });

            // Rating
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
                    Toast.show('⚠️ Please select a rating', 'warning');
                    return;
                }
                Toast.show('⭐ Thank you for rating us!', 'success');
            });

            // Bug Report
            document.getElementById('fbBugSubmit')?.addEventListener('click', function() {
                const title = document.getElementById('fbBugTitle').value.trim();
                const desc = document.getElementById('fbBugDesc').value.trim();
                if (!title || !desc) {
                    Toast.show('⚠️ Please fill in all fields', 'warning');
                    return;
                }
                Toast.show('🐛 Bug reported! Ticket created.', 'success');
            });

            // Feature Request
            document.getElementById('fbFeatureSubmit')?.addEventListener('click', function() {
                const title = document.getElementById('fbFeatureTitle').value.trim();
                const desc = document.getElementById('fbFeatureDesc').value.trim();
                if (!title || !desc) {
                    Toast.show('⚠️ Please fill in all fields', 'warning');
                    return;
                }
                Toast.show('💡 Feature suggestion submitted!', 'success');
            });

            // Live Chat
            document.getElementById('fbLiveChatStart')?.addEventListener('click', function() {
                document.getElementById('fbLiveChatStatus').textContent = 'Online';
                Toast.show('💬 Live chat started', 'success');
            });
            document.getElementById('fbLiveChatEnd')?.addEventListener('click', function() {
                document.getElementById('fbLiveChatStatus').textContent = 'Offline';
                Toast.show('💬 Live chat ended', 'info');
            });
        }
    };

    // ================================================================
    // 14. 3D LEARNING MODULE
    // ================================================================
    const ThreeD = {
        init: function() {
            const actions = [
                'd3LoadModel', 'd3ResetView', 'd3RotateLeft', 'd3RotateRight',
                'd3ZoomIn', 'd3ZoomOut', 'd3Pan', 'd3ToggleLabels',
                'd3PlayAnim', 'd3PauseAnim', 'd3StopAnim', 'd3SpeedUp', 'd3SlowDown',
                'd3Explode', 'd3Assemble', 'd3QuizStart', 'd3AIExplain'
            ];
            actions.forEach(id => {
                document.getElementById(id)?.addEventListener('click', function() {
                    const label = this.textContent.trim() || 'Action';
                    Toast.show(`🌐 3D: ${label}`, 'info');
                });
            });

            // Progress update
            document.getElementById('d3UpdateProgress')?.addEventListener('click', function() {
                const current = parseInt(document.getElementById('d3Progress').textContent) || 45;
                const newProgress = Math.min(100, current + 10);
                document.getElementById('d3Progress').textContent = newProgress + '%';
                document.getElementById('d3ProgressFill').style.width = newProgress + '%';
                Toast.show('📊 Progress updated to ' + newProgress + '%', 'success');
            });
        }
    };

    // ================================================================
    // 15. DIGITAL CV MODULE
    // ================================================================
    const CV = {
        init: function() {
            const actions = [
                'cvAddExperience', 'cvAddEducation', 'cvAddSkill', 'cvAddCert',
                'cvAddProject', 'cvSavePortfolio', 'cvSaveSocial', 'cvAddAchievement',
                'cvAISuggest', 'cvApplyTemplate', 'cvPreview',
                'cvShareLink', 'cvGenerateQR'
            ];
            actions.forEach(id => {
                document.getElementById(id)?.addEventListener('click', function() {
                    const label = this.textContent.trim() || 'Action';
                    Toast.show(`📄 CV: ${label}`, 'info');
                });
            });

            // AI Build
            document.getElementById('cvAIBuild')?.addEventListener('click', function() {
                Toast.show('🤖 AI is building your CV...', 'info');
                setTimeout(() => Toast.show('✅ CV built successfully!', 'success'), 2000);
            });

            // Download PDF
            document.getElementById('cvDownloadPDF')?.addEventListener('click', function() {
                Toast.show('📥 Downloading PDF...', 'info');
                setTimeout(() => Toast.show('✅ PDF downloaded!', 'success'), 1500);
            });
        }
    };

    // ================================================================
    // 16. GENERAL BUTTON HANDLERS (All buttons with data-*)
    // ================================================================
    document.addEventListener('DOMContentLoaded', function() {
        // تمام بٹنز جو کسی مخصوص ماڈیول میں نہیں آئے
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-danger').forEach(btn => {
            // اگر بٹن کی کوئی ID نہیں ہے یا وہ پہلے سے ہینڈل نہیں ہوا
            if (!btn.id || btn.id === 'darkModeBtn' || btn.id === 'modalCloseBtn' ||
                btn.id === 'modalCancelBtn' || btn.id === 'modalConfirmBtn' ||
                btn.id === 'menuToggle' || btn.id === 'sidebarClose' ||
                btn.id === 'notificationBell' || btn.id === 'markAllReadBtn' ||
                btn.id === 'scrollTopBtn') {
                return;
            }
            // اگر بٹن کسی فارم کا سبمٹ نہیں ہے
            if (btn.type !== 'submit') {
                btn.addEventListener('click', function(e) {
                    // اگر پہلے سے کوئی ایونٹ نہیں لگا
                    const hasListeners = this._listeners && this._listeners.length > 0;
                    if (!hasListeners) {
                        // صرف ان بٹنز کے لیے جن کا کوئی خاص ہینڈلر نہیں
                        const text = this.textContent.trim();
                        if (text && !this.closest('.chat-input') && !this.closest('.modal-footer')) {
                            Toast.show(`🔄 ${text}`, 'info');
                        }
                    }
                });
            }
        });
    });

    // ================================================================
    // 17. BOOT
    // ================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            App.init();
        });
    } else {
        App.init();
    }

    // ================================================================
    // 18. GLOBAL
    // ================================================================
    global.ScaleFlow = {
        App,
        Loader,
        Toast,
        Modal,
        Theme,
        Navigation,
        ScrollTop,
        Keyboard,
        Notifications,
        Settings,
        Security,
        AIMentor,
        Feedback,
        ThreeD,
        CV
    };

    console.log('✅ ScaleFlow University JavaScript loaded successfully');

})(window);
