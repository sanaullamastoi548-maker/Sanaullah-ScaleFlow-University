/============================================================
Sanaullah ScaleFlow University
script.js — Enterprise Application (All Modules)
Version: 1.0 (Fixed Selectors)
============================================================/

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

console.log('✅ ScaleFlow University JavaScript loaded successfully');
 

})(window);
