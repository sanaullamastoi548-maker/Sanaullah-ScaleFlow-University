/*============================================================
Sanaullah ScaleFlow University
script.js — Complete JavaScript
Part 1: Core Foundation
Version: 1.0
============================================================*/

(function(global) {
"use strict";

 
// ============================================================
// 1. DOM REFS — تمام اہم عناصر
// ============================================================
const loader = document.getElementById('loader');
const toastContainer = document.getElementById('toast-container');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const notificationBell = document.getElementById('notificationBell');
const notificationPanel = document.getElementById('notificationPanel');
const notificationCount = document.getElementById('notificationCount');
const markAllReadBtn = document.getElementById('markAllReadBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const currentYear = document.getElementById('currentYear');
const globalSearch = document.getElementById('globalSearchInput');
const navLinks = document.querySelectorAll('.sidebar-menu a[data-page]');
const pageSections = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
    page4: document.getElementById('page4'),
    page5: document.getElementById('page5'),
    page6: document.getElementById('page6'),
    page7: document.getElementById('page7'),
    page8: document.getElementById('page8'),
    page9: document.getElementById('page9'),
    page10: document.getElementById('page10'),
    page11: document.getElementById('page11'),
    page12: document.getElementById('page12')
};

// ============================================================
// 2. TOAST — نوٹیفکیشن دکھانے کا فنکشن
// ============================================================
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

// ============================================================
// 3. LOADER — صفحہ لوڈ ہونے پر چھپائیں
// ============================================================
function hideLoader() {
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
}

// ============================================================
// 4. MODAL — کھلنا / بند ہونا
// ============================================================
function openModal(title, bodyHTML, options = {}) {
    modalTitle.textContent = title || 'Modal';
    modalBody.innerHTML = bodyHTML || '<p>No content</p>';
    modalContainer.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (options.onOpen) options.onOpen();
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

// ============================================================
// 5. DARK MODE — تھیم تبدیل کریں اور محفوظ کریں
// ============================================================
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

// ============================================================
// 6. NAVIGATION — صفحات کا تبادلہ
// ============================================================
function navigateTo(pageId) {
    // تمام صفحات چھپائیں
    Object.values(pageSections).forEach(section => {
        if (section) section.classList.remove('active');
    });
    // مطلوبہ صفحہ دکھائیں
    const target = pageSections[pageId];
    if (target) target.classList.add('active');
    // سائیڈبار میں فعال لنک کو نمایاں کریں
    // سائیڈبار میں فعال لنک کو نمایاں کریں
navLinks.forEach(link => link.classList.remove('active'));

const activeLink = document.querySelector(
    `.sidebar-menu a[data-page="${pageId}"]`
);
    if (activeLink) activeLink.classList.add('active');
    // اوپر سکرول کریں
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // نوٹیفکیشن پینل بند کریں
    if (notificationPanel) notificationPanel.classList.remove('open');
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

// ============================================================
// 7. NOTIFICATION PANEL — گھنٹی کا پینل
// ============================================================
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

// ============================================================
// 8. SCROLL TOP — بٹن ظاہر/چھپائیں
// ============================================================
window.addEventListener('scroll', function() {
    if (scrollTopBtn) {
        scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    }
});
scrollTopBtn?.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 9. KEYBOARD SHORTCUTS — Ctrl+K سرچ، Escape موڈل/پینل بند
// ============================================================
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
    }
});

// ============================================================
// 10. CURRENT YEAR — فوٹر میں سال
// ============================================================
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ============================================================
// 11. GLOBAL EXPOSE — دوسرے حصوں کے لیے
// ============================================================
global.ScaleFlow = {
    showToast,
    openModal,
    closeModal,
    navigateTo,
    toggleDarkMode,
    hideLoader
};

console.log('📦 [Part 1] Core Foundation loaded');
 

})(window);


/*============================================================
Sanaullah ScaleFlow University
script.js — Complete JavaScript
Part 2: Dashboard & Home Features
Version: 1.0
============================================================*/

(function(global) {
"use strict";

 
// پہلے سے موجود ScaleFlow کو استعمال کریں
const SF = global.ScaleFlow || {};
const showToast = SF.showToast || function() {};
const navigateTo = SF.navigateTo || function() {};

// ============================================================
// 12. SEARCH — گلوبل سرچ
// ============================================================
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

// ============================================================
// 13. DASHBOARD STATS — ڈیمو ڈیٹا اپ ڈیٹ
// ============================================================
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
        projects: 3,
        todayLearning: '65%'
    };

    const els = {
        studentName: document.getElementById('studentName'),
        brainXP: document.getElementById('brainXP'),
        currentLevel: document.getElementById('currentLevel'),
        learningStreak: document.getElementById('learningStreak'),
        overallProgress: document.getElementById('overallProgress'),
        courseCount: document.getElementById('courseCount'),
        certificateCount: document.getElementById('certificateCount'),
        achievementCount: document.getElementById('achievementCount'),
        projectCount: document.getElementById('projectCount'),
        dashName: document.getElementById('dashName'),
        dashLevel: document.getElementById('dashLevel'),
        dashXP: document.getElementById('dashXP'),
        dashStreak: document.getElementById('dashStreak'),
        dashCourses: document.getElementById('dashCourses'),
        dashCerts: document.getElementById('dashCerts'),
        dashAchievements: document.getElementById('dashAchievements'),
        dashProgress: document.getElementById('dashProgress'),
        sidebarXP: document.getElementById('sidebarXP'),
        sidebarUserName: document.getElementById('sidebarUserName'),
        sidebarUserLevel: document.getElementById('sidebarUserLevel'),
        continueProgress: document.getElementById('continueProgress'),
        progressText: document.getElementById('progressText')
    };

    if (els.studentName) els.studentName.textContent = data.name;
    if (els.brainXP) els.brainXP.textContent = data.xp;
    if (els.currentLevel) els.currentLevel.textContent = data.level;
    if (els.learningStreak) els.learningStreak.textContent = data.streak;
    if (els.overallProgress) els.overallProgress.textContent = data.progress;
    if (els.courseCount) els.courseCount.textContent = data.courses;
    if (els.certificateCount) els.certificateCount.textContent = data.certificates;
    if (els.achievementCount) els.achievementCount.textContent = data.achievements;
    if (els.projectCount) els.projectCount.textContent = data.projects;
    if (els.dashName) els.dashName.textContent = data.name;
    if (els.dashLevel) els.dashLevel.textContent = data.level.replace('Level ', '');
    if (els.dashXP) els.dashXP.textContent = data.xp.replace(' XP', '');
    if (els.dashStreak) els.dashStreak.textContent = data.streak.replace(' Days', '');
    if (els.dashCourses) els.dashCourses.textContent = data.courses;
    if (els.dashCerts) els.dashCerts.textContent = data.certificates;
    if (els.dashAchievements) els.dashAchievements.textContent = data.achievements;
    if (els.dashProgress) els.dashProgress.textContent = data.progress;
    if (els.sidebarXP) els.sidebarXP.textContent = data.xp;
    if (els.sidebarUserName) els.sidebarUserName.textContent = data.name;
    if (els.sidebarUserLevel) els.sidebarUserLevel.textContent = data.level + ' • Advanced';

    const progress = parseInt(data.progress) || 65;
    if (els.continueProgress) els.continueProgress.style.width = progress + '%';
    if (els.progressText) els.progressText.textContent = progress + '% Complete';
}

// ============================================================
// 14. CONTINUE LEARNING — پروگریس بڑھائیں
// ============================================================
const continueProgressBtn = document.getElementById('continueProgressBtn');
const continueProgress = document.getElementById('continueProgress');
const progressText = document.getElementById('progressText');

if (continueProgressBtn) {
    continueProgressBtn.addEventListener('click', function() {
        let progress = parseInt(continueProgress.style.width) || 65;
        if (progress >= 100) {
            showToast('🎉 Course Complete!', 'success');
            return;
        }
        progress = Math.min(progress + 5, 100);
        continueProgress.style.width = progress + '%';
        if (progressText) progressText.textContent = progress + '% Complete';
        showToast('📈 Progress updated to ' + progress + '%', 'info');
    });
}

// ============================================================
// 15. TODAY'S TASKS — چیک باکس پر کلک
// ============================================================
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

// ============================================================
// 16. QUICK ACTIONS — نیویگیشن شارٹ کٹس
// ============================================================
const quickActions = {
    quickStartLearning: 'page4',
    quickAskAI: 'page7',
    quickBrowseCourses: 'page3',
    quickMyCertificates: 'page5',
    dashResumeLearning: 'page4',
    dashBrowseCourses: 'page3',
    dashAskAI: 'page7',
    dashCertificates: 'page5'
};

Object.keys(quickActions).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', function() {
            navigateTo(quickActions[id]);
        });
    }
});

// ============================================================
// 17. QUICK ACTIONS BOTTOM — تھیم، لینگویج، سپورٹ
// ============================================================
document.getElementById('btnTheme')?.addEventListener('click', function() {
    if (typeof global.ScaleFlow?.toggleDarkMode === 'function') {
        global.ScaleFlow.toggleDarkMode();
    } else {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }
});

document.getElementById('btnLanguage')?.addEventListener('click', function() {
    showToast('🌐 Language settings opened', 'info');
});

document.getElementById('btnSupport')?.addEventListener('click', function() {
    showToast('📞 Support opened', 'info');
});

// ============================================================
// 18. GATEWAY CARDS — کلک پر ٹوسٹ
// ============================================================
document.querySelectorAll('.gateway-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3')?.textContent || 'Module';
        showToast('🔍 Opening ' + title, 'info');
    });
});

// ============================================================
// 19. COURSE SEARCH (Courses Page)
// ============================================================
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

// ============================================================
// 20. COURSE FILTERS
// ============================================================
document.querySelectorAll('.filter-buttons .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        document.querySelectorAll('#courseGrid .course-card').forEach(card => {
            const diff = card.dataset.difficulty || 'all';
            card.style.display = (filter === 'all' || diff === filter) ? 'block' : 'none';
        });
        showToast('Filter: ' + filter, 'info');
    });
});

// ============================================================
// 21. COURSE START BUTTONS
// ============================================================
document.querySelectorAll('#courseGrid .course-card .btn-primary, .course-start, .course-enroll').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateTo('page4');
    });
});

// ============================================================
// 22. PAGINATION BUTTONS
// ============================================================
document.querySelectorAll('.pagination .btn-primary, .pagination .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        showToast('📄 Page ' + this.textContent.trim(), 'info');
    });
});

// ڈیٹا اپ ڈیٹ کریں
updateDashboardStats();

console.log('📦 [Part 2] Dashboard & Home Features loaded');
 

})(window);

/*============================================================
Sanaullah ScaleFlow University
script.js — Complete JavaScript
Part 3: All Page Modules
Version: 1.0
============================================================*/

(function(global) {
"use strict";

 
const SF = global.ScaleFlow || {};
const showToast = SF.showToast || function() {};
const openModal = SF.openModal || function() {};
const closeModal = SF.closeModal || function() {};
const navigateTo = SF.navigateTo || function() {};

// ============================================================
// 23. LEARNING PAGE — نوٹس، ریفلیکشن، کوئز، پی ڈی ایف
// ============================================================
document.getElementById('saveNotesBtn')?.addEventListener('click', function() {
    const notes = document.getElementById('notesInput')?.value;
    if (notes && notes.trim()) {
        showToast('✅ Notes saved!', 'success');
    } else {
        showToast('⚠️ Please write some notes.', 'warning');
    }
});

document.getElementById('getReflectionBtn')?.addEventListener('click', function() {
    const input = document.getElementById('reflectionInput');
    if (input && input.value.trim()) {
        showToast('🤖 Reflection received! Check AI response.', 'info');
    } else {
        showToast('⚠️ Please type your reflection.', 'warning');
    }
});

document.getElementById('submitQuizBtn')?.addEventListener('click', function() {
    const input = document.getElementById('quizAnswerInput');
    if (input && input.value.trim()) {
        showToast('✅ Quiz submitted!', 'success');
    } else {
        showToast('⚠️ Please provide an answer.', 'warning');
    }
});

document.getElementById('downloadPdfBtn')?.addEventListener('click', function() {
    showToast('📄 Downloading PDF...', 'info');
});

document.getElementById('prevLessonBtn')?.addEventListener('click', function() {
    showToast('◀ Previous lesson', 'info');
});

document.getElementById('nextLessonBtn')?.addEventListener('click', function() {
    showToast('▶ Next lesson', 'info');
});

// ============================================================
// 24. CERTIFICATES — ڈاؤن لوڈ، تصدیق، کیو آر، شیئر
// ============================================================
const certActions = [
    'certDownload1', 'certVerify1', 'certQR1', 'certShare1',
    'certDownload2', 'certVerify2', 'certQR2', 'certShare2'
];
certActions.forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.textContent.trim();
        showToast('📄 ' + action + ' clicked', 'info');
    });
});

// ============================================================
// 25. ACHIEVEMENTS — کارڈ پر کلک
// ============================================================
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('click', function() {
        const name = this.querySelector('h4')?.textContent || 'Achievement';
        const status = this.classList.contains('locked') ? '🔒 Locked' : '✅ Earned';
        openModal(name, '<p>Status: ' + status + '</p><p>Details about this achievement.</p>');
    });
});

// ============================================================
// 26. AI CHAT — میسج بھیجنا، وائس، کلئیر
// ============================================================
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatClearBtn = document.getElementById('chatClearBtn');
const chatVoiceBtn = document.getElementById('chatVoiceBtn');

if (chatSendBtn && chatInput && chatMessages) {
    chatSendBtn.addEventListener('click', function() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        // یوزر میسج
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = msg;
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        // مصنوعی AI جواب
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
            chatMessages.appendChild(aiMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') chatSendBtn.click();
    });
}

if (chatClearBtn && chatMessages) {
    chatClearBtn.addEventListener('click', function() {
        chatMessages.innerHTML = '';
        const welcome = document.createElement('div');
        welcome.className = 'message ai';
        welcome.textContent = 'Hello! How can I assist you today?';
        chatMessages.appendChild(welcome);
        showToast('Chat cleared', 'info');
    });
}

if (chatVoiceBtn) {
    chatVoiceBtn.addEventListener('click', function() {
        showToast('🎤 Voice input activated (demo)', 'info');
    });
}

// AI Prompt Suggestions
document.getElementById('promptClosure')?.addEventListener('click', function() {
    if (chatInput) { chatInput.value = 'Explain closures in JavaScript.'; chatInput.focus(); }
});
document.getElementById('promptHoisting')?.addEventListener('click', function() {
    if (chatInput) { chatInput.value = 'What is hoisting?'; chatInput.focus(); }
});
document.getElementById('promptAsync')?.addEventListener('click', function() {
    if (chatInput) { chatInput.value = 'Help with async/await.'; chatInput.focus(); }
});

// ============================================================
// 27. MARKETPLACE — کارٹ، چیک آؤٹ، کیٹیگریز، ایڈ ٹو کارٹ
// ============================================================
document.getElementById('marketplaceCart')?.addEventListener('click', function() {
    showToast('🛒 Cart opened (0 items)', 'info');
});

document.getElementById('marketplaceCheckout')?.addEventListener('click', function() {
    showToast('💳 Checkout initiated', 'success');
});

document.getElementById('marketplaceCategories')?.addEventListener('click', function() {
    showToast('📂 Categories opened', 'info');
});

['addToCart1', 'addToCart2', 'addToCart3'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
        e.stopPropagation();
        showToast('✅ Added to cart!', 'success');
    });
});

// ============================================================
// 28. BUSINESS — اوپن بٹنز
// ============================================================
['openCRM', 'openProjects', 'openClients', 'openIncome', 'openReports'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
        e.stopPropagation();
        const module = this.closest('.business-card')?.querySelector('h3')?.textContent || 'Module';
        openModal('💼 ' + module, '<p>This module is under development. Stay tuned!</p>');
    });
});

// ============================================================
// 29. PROFILE — ایڈٹ پروفائل
// ============================================================
    document.getElementById('editProfileBtn')?.addEventListener('click', function () {

    openModal(
        '✏️ Edit Profile',
        `
        <form id="profileEditForm">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" value="Sanaullah" id="editName" class="w-full">
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" value="sanaullah@university.com" id="editEmail" class="w-full">
            </div>

            <button type="submit" class="btn-primary w-full">
                Save Changes
            </button>
        </form>
        `
    );

    document.getElementById('profileEditForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        showToast('✅ Profile updated!', 'success');
        closeModal();
    });

});

// ============================================================
// 30. SETTINGS — تھیم، لینگویج، سیکیورٹی، بیک اپ
// ============================================================
document.getElementById('settingsThemeBtn')?.addEventListener('click', function() {
    if (typeof global.ScaleFlow?.toggleDarkMode === 'function') {
        global.ScaleFlow.toggleDarkMode();
    } else {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }
});

document.getElementById('settingsLanguage')?.addEventListener('change', function() {
    showToast('🌐 Language set to ' + this.value, 'info');
});

    document.getElementById('settingsChangePassword')?.addEventListener('click', function () {

    openModal(
        '🔐 Change Password',
        `
        <form id="changePwdForm">

            <div class="form-group">
                <label>Current Password</label>
                <input type="password" class="w-full">
            </div>

            <div class="form-group">
                <label>New Password</label>
                <input type="password" class="w-full">
            </div>

            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="w-full">
            </div>

            <button type="submit" class="btn-primary w-full">
                Update Password
            </button>

        </form>
        `
    );

    document.getElementById('changePwdForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        showToast('✅ Password updated!', 'success');
        closeModal();
    });

});
  
document.getElementById('settingsEnable2FA')?.addEventListener('click', function() {
    showToast('✅ Two-Factor Authentication enabled!', 'success');
});

document.getElementById('settingsBackupBtn')?.addEventListener('click', function() {
    showToast('💾 Backup started...', 'info');
    setTimeout(() => showToast('✅ Backup completed!', 'success'), 2000);
});

// نوٹیفکیشن سیٹنگز
document.querySelectorAll('#notifEmail, #notifPush, #notifSMS').forEach(cb => {
    cb.addEventListener('change', function() {
        showToast('🔔 Notification setting updated', 'info');
    });
});

console.log('📦 [Part 3] All Page Modules loaded');
 

})(window);

/*============================================================
Sanaullah ScaleFlow University
script.js — Complete JavaScript
Part 4: Login, Validation, Generic Handlers, Start
Version: 1.0
============================================================*/

(function(global) {
"use strict";

 
const SF = global.ScaleFlow || {};
const showToast = SF.showToast || function() {};
const openModal = SF.openModal || function() {};
const closeModal = SF.closeModal || function() {};
const navigateTo = SF.navigateTo || function() {};
const hideLoader = SF.hideLoader || function() {};

// ============================================================
// 31. LOGIN FORM — ویلڈیشن
// ============================================================
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

// ============================================================
// 32. FORGOT PASSWORD & REGISTER — موڈل میں
// ============================================================
document.getElementById('forgotPasswordLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    `
<form>
...
</form>
`
        <p>Enter your email to receive OTP.</p>
        <div class="form-group">
            <input type="email" placeholder="student@university.com" id="otpEmail" class="w-full">
        </div>
        <button id="otpSendBtn" class="btn-primary w-full">Send OTP</button>
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
            <div class="form-group"><label>Full Name</label><input type="text" placeholder="Sanaullah" class="w-full" required></div>
            <div class="form-group"><label>Email</label><input type="email" placeholder="student@university.com" class="w-full" required></div>
            <div class="form-group"><label>Password</label><input type="password" placeholder="••••••••" class="w-full" required></div>
            <button type="submit" class="btn-primary w-full">Create Account</button>
        </form>
    `);
    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('✅ Account created! Please login.', 'success');
        closeModal();
    });
});

// ============================================================
// 33. LOGIN OTP BUTTON
// ============================================================
document.getElementById('loginOTPBtn')?.addEventListener('click', function() {
    showToast('📧 OTP sent to your email!', 'info');
});

// ============================================================
// 34. GENERIC BUTTON HANDLER — باقی بٹنز کے لیے ٹوسٹ
// ============================================================
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-danger').forEach(btn => {
    // ان بٹنز کو چھوڑیں جن کا پہلے سے ہینڈلر ہے
    const skipIds = [
        'darkModeBtn', 'modalCloseBtn', 'modalCancelBtn', 'modalConfirmBtn',
        'continueProgressBtn', 'quickStartLearning', 'quickAskAI', 'quickBrowseCourses',
        'quickMyCertificates', 'dashResumeLearning', 'dashBrowseCourses',
        'dashAskAI', 'dashCertificates', 'btnTheme', 'btnLanguage', 'btnSupport',
        'menuToggle', 'sidebarClose', 'notificationBell', 'markAllReadBtn',
        'scrollTopBtn', 'settingsThemeBtn', 'loginSubmitBtn', 'loginOTPBtn',
        'saveNotesBtn', 'getReflectionBtn', 'submitQuizBtn', 'downloadPdfBtn',
        'prevLessonBtn', 'nextLessonBtn', 'certDownload1', 'certVerify1',
        'certQR1', 'certShare1', 'certDownload2', 'certVerify2', 'certQR2',
        'certShare2', 'marketplaceCart', 'marketplaceCheckout', 'marketplaceCategories',
        'addToCart1', 'addToCart2', 'addToCart3', 'openCRM', 'openProjects',
        'openClients', 'openIncome', 'openReports', 'editProfileBtn',
        'settingsChangePassword', 'settingsEnable2FA', 'settingsBackupBtn',
        'forgotPasswordLink', 'registerLink', 'chatSendBtn', 'chatClearBtn',
        'chatVoiceBtn', 'promptClosure', 'promptHoisting', 'promptAsync'
    ];
    if (skipIds.includes(btn.id)) return;
    // اگر بٹن کسی فارم کا سبمٹ نہیں ہے
    if (btn.type !== 'submit' && !btn.closest('form')) {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            if (text && !this.closest('.chat-input') && !this.closest('.modal-footer')) {
                showToast('🔄 ' + text, 'info');
            }
        });
    }
});

// ============================================================
// 35. ANIMATIONS — اسکرول پر عناصر کو ظاہر کریں
// ============================================================
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gateway-card, .course-card, .achievement-card, .stat-box, .dashboard-box').forEach(el => {
        observer.observe(el);
    });
}

// بٹنوں پر کلک اینیمیشن
document.querySelectorAll('.btn-primary, .btn-secondary, .quick-btn, .quick-action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => { this.style.transform = ''; }, 150);
    });
});

// ============================================================
// 36. RTL SUPPORT — اگر صفحہ RTL میں ہو
// ============================================================
if (document.documentElement.getAttribute('dir') === 'rtl') {
    // RTL کے لیے کوئی خاص تبدیلی (جاوا اسکرپٹ کی ضرورت نہیں، CSS سنبھال لے گی)
    console.log('📄 RTL mode detected');
}

// ============================================================
// 37. BOOT — سب کچھ شروع کریں
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // لوڈر چھپائیں
    hideLoader();
    // خوش آمدید
    showToast('🎓 Welcome to ScaleFlow University', 'success');
    // ڈیفالٹ پیج (page1) کو یقینی بنائیں
    navigateTo('page1');
    console.log('🚀 ScaleFlow University loaded successfully');
});

// ============================================================
// 38. GLOBAL — اگر کسی اور فائل کو ضرورت ہو
// ============================================================
global.ScaleFlow = {
    showToast,
    openModal,
    closeModal,
    navigateTo,
    toggleDarkMode: function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    },
    hideLoader,
    updateDashboardStats: function() {
        // یہ فنکشن Part 2 میں موجود ہے، یہاں صرف ریفرنس کے لیے
    }
};

console.log('📦 [Part 4] Login, Validation & Final Polish loaded');
console.log('✅ ScaleFlow University JavaScript complete!');
 

})(window);
/*============================================================
Sanaullah ScaleFlow University
script.js — Complete JavaScript
Part 4: Login, Validation, Generic Handlers, Start
Version: 1.0
============================================================*/

(function(global) {
"use strict";

 
const SF = global.ScaleFlow || {};
const showToast = SF.showToast || function() {};
const openModal = SF.openModal || function() {};
const closeModal = SF.closeModal || function() {};
const navigateTo = SF.navigateTo || function() {};
const hideLoader = SF.hideLoader || function() {};

// ============================================================
// 31. LOGIN FORM — ویلڈیشن
// ============================================================
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

// ============================================================
// 32. FORGOT PASSWORD & REGISTER — موڈل میں
// ============================================================
document.getElementById('forgotPasswordLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(
'Forgot Password',
`
<p>....</p>
...
`
);
        <p>Enter your email to receive OTP.</p>
        <div class="form-group">
            <input type="email" placeholder="student@university.com" id="otpEmail" class="w-full">
        </div>
        <button id="otpSendBtn" class="btn-primary w-full">Send OTP</button>
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
            <div class="form-group"><label>Full Name</label><input type="text" placeholder="Sanaullah" class="w-full" required></div>
            <div class="form-group"><label>Email</label><input type="email" placeholder="student@university.com" class="w-full" required></div>
            <div class="form-group"><label>Password</label><input type="password" placeholder="••••••••" class="w-full" required></div>
            <button type="submit" class="btn-primary w-full">Create Account</button>
        </form>
    `);
    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('✅ Account created! Please login.', 'success');
        closeModal();
    });
});

// ============================================================
// 33. LOGIN OTP BUTTON
// ============================================================
document.getElementById('loginOTPBtn')?.addEventListener('click', function() {
    showToast('📧 OTP sent to your email!', 'info');
});

// ============================================================
// 34. GENERIC BUTTON HANDLER — باقی بٹنز کے لیے ٹوسٹ
// ============================================================
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-danger').forEach(btn => {
    // ان بٹنز کو چھوڑیں جن کا پہلے سے ہینڈلر ہے
    const skipIds = [
        'darkModeBtn', 'modalCloseBtn', 'modalCancelBtn', 'modalConfirmBtn',
        'continueProgressBtn', 'quickStartLearning', 'quickAskAI', 'quickBrowseCourses',
        'quickMyCertificates', 'dashResumeLearning', 'dashBrowseCourses',
        'dashAskAI', 'dashCertificates', 'btnTheme', 'btnLanguage', 'btnSupport',
        'menuToggle', 'sidebarClose', 'notificationBell', 'markAllReadBtn',
        'scrollTopBtn', 'settingsThemeBtn', 'loginSubmitBtn', 'loginOTPBtn',
        'saveNotesBtn', 'getReflectionBtn', 'submitQuizBtn', 'downloadPdfBtn',
        'prevLessonBtn', 'nextLessonBtn', 'certDownload1', 'certVerify1',
        'certQR1', 'certShare1', 'certDownload2', 'certVerify2', 'certQR2',
        'certShare2', 'marketplaceCart', 'marketplaceCheckout', 'marketplaceCategories',
        'addToCart1', 'addToCart2', 'addToCart3', 'openCRM', 'openProjects',
        'openClients', 'openIncome', 'openReports', 'editProfileBtn',
        'settingsChangePassword', 'settingsEnable2FA', 'settingsBackupBtn',
        'forgotPasswordLink', 'registerLink', 'chatSendBtn', 'chatClearBtn',
        'chatVoiceBtn', 'promptClosure', 'promptHoisting', 'promptAsync'
    ];
    if (skipIds.includes(btn.id)) return;
    // اگر بٹن کسی فارم کا سبمٹ نہیں ہے
    if (btn.type !== 'submit' && !btn.closest('form')) {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            if (text && !this.closest('.chat-input') && !this.closest('.modal-footer')) {
                showToast('🔄 ' + text, 'info');
            }
        });
    }
});

// ============================================================
// 35. ANIMATIONS — اسکرول پر عناصر کو ظاہر کریں
// ============================================================
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gateway-card, .course-card, .achievement-card, .stat-box, .dashboard-box').forEach(el => {
        observer.observe(el);
    });
}

// بٹنوں پر کلک اینیمیشن
document.querySelectorAll('.btn-primary, .btn-secondary, .quick-btn, .quick-action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => { this.style.transform = ''; }, 150);
    });
});

// ============================================================
// 36. RTL SUPPORT — اگر صفحہ RTL میں ہو
// ============================================================
if (document.documentElement.getAttribute('dir') === 'rtl') {
    // RTL کے لیے کوئی خاص تبدیلی (جاوا اسکرپٹ کی ضرورت نہیں، CSS سنبھال لے گی)
    console.log('📄 RTL mode detected');
}

// ============================================================
// 37. BOOT — سب کچھ شروع کریں
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // لوڈر چھپائیں
    hideLoader();
    // خوش آمدید
    showToast('🎓 Welcome to ScaleFlow University', 'success');
    // ڈیفالٹ پیج (page1) کو یقینی بنائیں
    navigateTo('page1');
    console.log('🚀 ScaleFlow University loaded successfully');
});

// ============================================================
// 38. GLOBAL — اگر کسی اور فائل کو ضرورت ہو
// ============================================================
global.ScaleFlow = {
    showToast,
    openModal,
    closeModal,
    navigateTo,
    toggleDarkMode: function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    },
    hideLoader,
    updateDashboardStats: function() {
        // یہ فنکشن Part 2 میں موجود ہے، یہاں صرف ریفرنس کے لیے
    }
};

console.log('📦 [Part 4] Login, Validation & Final Polish loaded');
console.log('✅ ScaleFlow University JavaScript complete!');
 

})(window);

window.addEventListener("load", function () {
window.ScaleFlow?.hideLoader?.();
});
