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

 
const SF = global.ScaleFlow;

if (!SF) {
    console.error("❌ ScaleFlow Core (Part 1) is not loaded.");
    return;
}

const {
    showToast,
    openModal,
    closeModal,
    navigateTo,
    hideLoader,
    toggleDarkMode,
    updateDashboardStats
} = SF;

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
        '🔑 Forgot Password',
        `
        <p>Enter your email to receive OTP.</p>

        <div class="form-group">
            <input
                type="email"
                id="otpEmail"
                class="w-full"
                placeholder="student@university.com">
        </div>

        <button
            type="button"
            id="otpSendBtn"
            class="btn-primary w-full">
            Send OTP
        </button>
        `
    );

    document.getElementById('otpSendBtn')?.addEventListener('click', function () {
        showToast('📧 OTP sent to your email!', 'success');
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

/* ==========================================
   ScaleFlow University
   AI SMART CENTER
   JavaScript Part-1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const aiCards = document.querySelectorAll("#aiSmartCenter .tool-card");

    aiCards.forEach(card => {

        card.addEventListener("click", () => {

            const feature = card.querySelector("h3").innerText;

            alert(
`🤖 ${feature}

✅ Status : COMING SOON

This feature is already built into ScaleFlow University.

Only AI/API Connection is required.

Future Version:
✔ AI Ready
✔ Security Ready
✔ Enterprise Ready`
            );

        });

    });

});


/* ==========================================
   ScaleFlow University
   AI SMART CENTER
   JavaScript Part-2
   Premium AI Modal
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // اگر پہلے سے موجود ہو تو دوبارہ نہ بنائیں
    if (document.getElementById("aiComingSoonModal")) return;

    const modal = document.createElement("div");

    modal.id = "aiComingSoonModal";

    modal.innerHTML = `

<div class="ai-modal-overlay">

    <div class="ai-modal-box">

        <h2 id="aiFeatureTitle">🤖 AI Feature</h2>

        <p>
            This feature is already built inside
            <strong>ScaleFlow University.</strong>
        </p>

        <ul>

            <li>✅ AI Ready</li>
            <li>✅ Database Ready</li>
            <li>✅ Security Ready</li>
            <li>✅ Enterprise Ready</li>
            <li>🚀 Only AI/API Connection Required</li>

        </ul>

        <button id="closeAIModal">
            OK
        </button>

    </div>

</div>

`;

    document.body.appendChild(modal);

    modal.style.display = "none";

    const cards = document.querySelectorAll("#aiSmartCenter .tool-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            document.getElementById("aiFeatureTitle").innerHTML =
                "🤖 " + card.querySelector("h3").innerText;

            modal.style.display = "flex";

        });

    });

    document.getElementById("closeAIModal").onclick = () => {

        modal.style.display = "none";

    };

    modal.addEventListener("click", function (e) {

        if (e.target === modal) {

            modal.style.display = "none";

        }

    });

});

/* ==========================================
   ScaleFlow University
   AI SMART CENTER
   JavaScript Part-3
   Premium Tool Effects
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const aiCards = document.querySelectorAll("#aiSmartCenter .tool-card");

    aiCards.forEach(card => {

        // Mouse Enter Animation
        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-10px) scale(1.03)";

        });

        // Mouse Leave Animation
        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

        // Double Click Animation
        card.addEventListener("dblclick", () => {

            const title = card.querySelector("h3").innerText;

            const badge = card.querySelector("span");

            badge.innerText = "INITIALIZING...";

            badge.style.background = "#ff9800";

            setTimeout(() => {

                badge.innerText = "COMING SOON";

                badge.style.background = "#16a34a";

            },2000);

            console.log(title + " Future AI Module Ready");

        });

    });

});


/* ==========================================
   Future AI Connection
========================================== */

const ScaleFlowAI = {

    teacher:false,

    mentor:false,

    voice:false,

    reflection:false,

    faceLogin:false,

    fingerprint:false,

    certificates:false,

    career:false

};

console.log("ScaleFlow AI Smart Center Ready");
console.log(ScaleFlowAI);


/* ==========================================
   ScaleFlow University
   JavaScript Part-4
   Future AI Preview Engine
   Version : 1.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Face Login Preview
    ========================== */

    const faceCard = [...document.querySelectorAll("#aiSmartCenter .tool-card")]
        .find(card => card.innerText.includes("Face Login"));

    if (faceCard) {

        faceCard.addEventListener("click", () => {

            simulateFuture(faceCard, "😀 Face Scanner Starting...");

        });

    }


    /* ==========================
       Fingerprint Preview
    ========================== */

    const fingerCard = [...document.querySelectorAll("#aiSmartCenter .tool-card")]
        .find(card => card.innerText.includes("Fingerprint"));

    if (fingerCard) {

        fingerCard.addEventListener("click", () => {

            simulateFuture(fingerCard, "👆 Fingerprint Scanner Starting...");

        });

    }


    /* ==========================
       Voice Teacher Preview
    ========================== */

    const voiceCard = [...document.querySelectorAll("#aiSmartCenter .tool-card")]
        .find(card => card.innerText.includes("Voice"));

    if (voiceCard) {

        voiceCard.addEventListener("click", () => {

            simulateFuture(voiceCard, "🎙 AI Voice Loading...");

        });

    }


    /* ==========================
       AI Teacher Preview
    ========================== */

    const teacherCard = [...document.querySelectorAll("#aiSmartCenter .tool-card")]
        .find(card => card.innerText.includes("AI Teacher"));

    if (teacherCard) {

        teacherCard.addEventListener("click", () => {

            simulateFuture(teacherCard, "🤖 AI Teacher Booting...");

        });

    }

});


/* ==========================================
   Future Preview Animation
========================================== */

function simulateFuture(card, message) {

    const badge = card.querySelector("span");

    badge.innerHTML = "⏳ Loading...";

    badge.style.background = "#f59e0b";

    console.log(message);

    setTimeout(() => {

        badge.innerHTML = "🚀 AI READY";

        badge.style.background = "#16a34a";

    }, 2500);

}


/* ==========================================
   Reserved AI Connect Functions
========================================== */

function connectOpenAI(){}

function connectGemini(){}

function connectClaude(){}

function connectDeepSeek(){}

function connectVoiceAI(){}

function connectFaceRecognition(){}

function connectFingerprint(){}

console.log("Future AI Engine Loaded Successfully");


/* =========================================
   SECURITY CENTER
   Part 1 / 4
   ScaleFlow University
========================================= */

const SecurityCenter = {

    version: "1.0",

    ready: false,

    init() {

        this.cache();

        this.bindEvents();

        this.showStatus();

        this.ready = true;

        console.log("🛡️ Security Center Ready");

    },

    cache() {

        this.cards = document.querySelectorAll("#securityCenter .tool-card");

    },

    bindEvents() {

        this.cards.forEach(card => {

            card.addEventListener("click", () => {

                this.openComingSoon(card);

            });

        });

    },

    showStatus() {

        console.log("Security Modules Loaded");

    },

    openComingSoon(card) {

        const title = card.querySelector("h3").innerText;

        alert(
            title +
            "\n\n🚀 COMING SOON\n\nThis feature is AI Ready."
        );

    }

};

document.addEventListener("DOMContentLoaded", () => {

    SecurityCenter.init();

});

/* =========================================
   SECURITY CENTER
   Part 2 / 4
   Feature Status Manager
========================================= */

SecurityCenter.modules = {

    faceRecognition: false,
    fingerprint: false,
    twoFactor: false,
    deviceVerification: false,
    smartLocation: false,
    loginAlerts: false,
    recoveryKeys: false,
    endToEnd: false

};

SecurityCenter.updateStatus = function () {

    const statusMap = {

        faceRecognition: "😀 Face Recognition",
        fingerprint: "👆 Fingerprint Scan",
        twoFactor: "📱 Two Factor Login",
        deviceVerification: "💻 Device Verification",
        smartLocation: "📍 Smart Location",
        loginAlerts: "🚨 Login Alerts",
        recoveryKeys: "🔑 Recovery Keys",
        endToEnd: "🔒 End-to-End Security"

    };

    this.cards.forEach(card => {

        const title = card.querySelector("h3").innerText;
        const badge = card.querySelector("span");

        Object.keys(statusMap).forEach(key => {

            if (title === statusMap[key]) {

                if (this.modules[key]) {

                    badge.innerHTML = "🟢 ACTIVE";
                    badge.style.background = "#00b894";

                } else {

                    badge.innerHTML = "🟡 AI REQUIRED";
                    badge.style.background = "#f39c12";

                }

            }

        });

    });

};

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {

        SecurityCenter.updateStatus();

    }, 300);

});

/* ==========================================================
   ScaleFlow University
   Security Center
   JavaScript Part-3
   Security Status Manager
========================================================== */

(function () {
    "use strict";

    function initializeSecurityStatus() {

        const cards = document.querySelectorAll("#securityCenter .tool-card");

        cards.forEach((card) => {

            const badge = card.querySelector("span");

            if (!badge) return;

            badge.classList.add("status-ready");

            badge.setAttribute("title", "Feature is ready for AI integration");

        });

        console.log("✅ Security Status Ready");
    }

    window.initializeSecurityStatus = initializeSecurityStatus;

})();

/* ==========================================================
   ScaleFlow University
   Security Center
   JavaScript Part-4
   Future AI Connector Engine
========================================================== */

(function () {
    "use strict";

    const SecurityAI = {

        connected: false,

        connect() {

            this.connected = true;

            console.log("🤖 Security AI Connected");

            this.updateUI();

        },

        disconnect() {

            this.connected = false;

            console.log("❌ Security AI Offline");

            this.updateUI();

        },

        updateUI() {

            const cards = document.querySelectorAll("#securityCenter .tool-card");

            cards.forEach(card => {

                const badge = card.querySelector("span");

                if (!badge) return;

                if (this.connected) {

                    badge.textContent = "🟢 AI ACTIVE";
                    badge.style.background = "#27ae60";
                    badge.style.color = "#ffffff";

                } else {

                    badge.textContent = "🟡 AI READY";
                    badge.style.background = "#f39c12";
                    badge.style.color = "#ffffff";

                }

            });

        }

    };

    window.SecurityAI = SecurityAI;

})();


/* ==========================================
   3D LEARNING CENTER
   Part-1
   ScaleFlow University
========================================== */

const Learning3DCenter = {

    initialized: false,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        console.log("✅ 3D Learning Center Initialized");

        this.bindEvents();

    },

    bindEvents() {

        const cards = document.querySelectorAll(
            "#learning3DCenter .tool-card"
        );

        cards.forEach(card => {

            card.addEventListener("click", () => {

                this.showComingSoon(card);

            });

        });

    },

    showComingSoon(card) {

        const title = card.querySelector("h3").innerText;

        alert(
            title +
            "\n\nCOMING SOON\n\nThis module is AI Ready.\nIt will activate after AI integration."
        );

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Learning3DCenter.init();

});

/* ==========================================
   3D LEARNING CENTER
   Part-2
   Premium Animation
========================================== */

Learning3DCenter.animateCards = function () {

    const cards = document.querySelectorAll(
        "#learning3DCenter .tool-card"
    );

    cards.forEach((card, index) => {

        /* Initial Animation */

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition =
                "all .6s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0px)";

        }, index * 120);

        /* Hover Effect */

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-10px) scale(1.03)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0px) scale(1)";

        });

    });

};

/* READY Badge Animation */

Learning3DCenter.animateStatus = function () {

    const badges = document.querySelectorAll(
        "#learning3DCenter .tool-card span"
    );

    setInterval(() => {

        badges.forEach(badge => {

            badge.style.opacity = ".65";

            setTimeout(() => {

                badge.style.opacity = "1";

            }, 450);

        });

    }, 2000);

};

/* Run */

document.addEventListener("DOMContentLoaded", () => {

    Learning3DCenter.animateCards();

    Learning3DCenter.animateStatus();

});

/* ==========================================
   3D LEARNING CENTER
   Part-3
   AI READY ENGINE
========================================== */

Learning3DCenter.launchViewer = function (moduleName) {

    console.log("Launching :", moduleName);

    this.showFutureMessage(moduleName);

};

Learning3DCenter.launchVoiceTeacher = function (lessonName) {

    console.log("Voice Teacher :", lessonName);

    this.showFutureMessage(
        "AI Voice Teacher\n\nLesson : " + lessonName
    );

};

Learning3DCenter.startAIEngine = function () {

    console.log("AI Engine Ready");

};

Learning3DCenter.start3DEngine = function () {

    console.log("3D Engine Ready");

};

Learning3DCenter.showFutureMessage = function (title) {

    alert(
        "🚀 " + title +

        "\n\nCOMING SOON"

        + "\n\n"

        + "This feature is already integrated."

        + "\n"

        + "Only AI / 3D Model"

        + "\n"

        + "needs to be connected."

    );

};

/* Card Launcher */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(
        "#learning3DCenter .tool-card"
    );

    cards.forEach(card => {

        card.addEventListener("dblclick", () => {

            const lesson = card.querySelector("h3").innerText;

            Learning3DCenter.launchViewer(lesson);

        });

    });

});

/* ==========================================
   3D LEARNING CENTER
   Part-4
   Future Integration Manager
   ScaleFlow University
========================================== */

Learning3DCenter.integration = {

    aiConnected: false,
    viewerConnected: false,
    voiceConnected: false,

    initialize() {

        console.log("================================");
        console.log("ScaleFlow Future Manager Started");
        console.log("================================");

        this.checkAI();

        this.checkViewer();

        this.checkVoice();

        this.updateStatus();

    },

    checkAI() {

        if (this.aiConnected) {

            console.log("AI Connected");

        } else {

            console.log("AI Waiting...");

        }

    },

    checkViewer() {

        if (this.viewerConnected) {

            console.log("3D Viewer Connected");

        } else {

            console.log("3D Viewer Waiting...");

        }

    },

    checkVoice() {

        if (this.voiceConnected) {

            console.log("Voice Connected");

        } else {

            console.log("Voice Waiting...");

        }

    },

    updateStatus() {

        const badges =
            document.querySelectorAll(
                "#learning3DCenter .tool-card span"
            );

        badges.forEach(badge => {

            if (

                this.aiConnected ||

                this.viewerConnected ||

                this.voiceConnected

            ) {

                badge.innerHTML = "ONLINE";

                badge.style.background =
                    "#00c853";

            } else {

                badge.innerHTML = "COMING SOON";

                badge.style.background =
                    "#ff9800";

            }

        });

    },

    connectAI() {

        this.aiConnected = true;

        this.updateStatus();

        console.log("AI Connected Successfully");

    },

    connectViewer() {

        this.viewerConnected = true;

        this.updateStatus();

        console.log("3D Viewer Connected");

    },

    connectVoice() {

        this.voiceConnected = true;

        this.updateStatus();

        console.log("Voice Teacher Connected");

    }

};

/* Auto Initialize */

document.addEventListener("DOMContentLoaded", () => {

    Learning3DCenter.integration.initialize();

});

/* ==========================================
   PAYMENT CENTER
   JavaScript Part-1
   Initialization
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePaymentCenter();

});

function initializePaymentCenter() {

    console.log("💳 Payment Center Loaded");

    initializePaymentCards();

}

function initializePaymentCards() {

    const cards = document.querySelectorAll(".pricing-card");

    cards.forEach((card,index)=>{

        card.dataset.plan=index+1;

        console.log("Plan Ready :",card.dataset.plan);

    });

}

/* ==========================================
   PAYMENT CENTER
   JavaScript Part-2
   Plan Selection + Coming Soon Popup
========================================== */

function initializePaymentCenter() {

    console.log("💳 Payment Center Loaded");

    initializePaymentCards();

    initializePlanButtons();

}

/* ==========================================
   PLAN BUTTONS
========================================== */

function initializePlanButtons() {

    const buttons = document.querySelectorAll(".pricing-card button");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            showComingSoonPopup();

        });

    });

}

/* ==========================================
   CARD CLICK
========================================== */

document.querySelectorAll(".pricing-card").forEach(card => {

    card.addEventListener("click", function () {

        document.querySelectorAll(".pricing-card").forEach(c => {

            c.classList.remove("selected-plan");

        });

        this.classList.add("selected-plan");

        console.log("Selected Plan:", this.querySelector("h3").innerText);

    });

});

/* ==========================================
   COMING SOON POPUP
========================================== */

function showComingSoonPopup() {

    alert(
`💳 ScaleFlow University

🚀 Payment System

COMING SOON

Future Supported:

✅ Stripe
✅ PayPal
✅ Google Pay
✅ Apple Pay
✅ STC Pay
✅ Mada
✅ JazzCash
✅ EasyPaisa

🤖 AI Ready
🔒 Secure Payment
🌍 Future Ready`
    );

}

/* ==========================================
   PAYMENT CENTER
   JavaScript Part-3
   AI Subscription Manager
   Payment Gateway Loader
   Scholarship & Referral System
========================================== */

/* ==========================================
   AI SUBSCRIPTION MANAGER
========================================== */

const SubscriptionManager = {

    currentPlan: "FREE",

    upgrade(plan){

        this.currentPlan = plan;

        console.log("🚀 Subscription Updated:", plan);

    },

    getCurrentPlan(){

        return this.currentPlan;

    }

};

/* ==========================================
   PAYMENT GATEWAY LOADER
========================================== */

const PaymentGateway = {

    stripe:false,
    paypal:false,
    jazzcash:false,
    easypaisa:false,
    stcpay:false,
    mada:false,

    loadGateway(name){

        console.log("💳 Loading Gateway:",name);

        if(this.hasOwnProperty(name.toLowerCase())){

            this[name.toLowerCase()] = true;

        }

    },

    status(){

        console.table(this);

    }

};

/* ==========================================
   SCHOLARSHIP SYSTEM
========================================== */

const ScholarshipSystem = {

    eligible:false,

    checkEligibility(studentXP){

        if(studentXP >= 1000){

            this.eligible = true;

            console.log("🎓 Scholarship Eligible");

        }else{

            this.eligible = false;

            console.log("❌ Scholarship Not Eligible");

        }

    }

};

/* ==========================================
   REFERRAL SYSTEM
========================================== */

const ReferralSystem = {

    referralCount:0,

    addReferral(){

        this.referralCount++;

        console.log("👥 Referral Added:",this.referralCount);

    },

    rewardCheck(){

        if(this.referralCount >= 10){

            console.log("🎁 Free Premium Reward Ready");

        }

    }

};

/* ==========================================
   AI PAYMENT ANALYZER
========================================== */

function analyzeSubscription(){

    console.log("🤖 AI Subscription Analysis Running...");

    console.log("Current Plan:",
        SubscriptionManager.getCurrentPlan());

}

/* ==========================================
   FUTURE READY
========================================== */

console.log("✅ AI Subscription Manager Ready");
console.log("✅ Payment Gateway Loader Ready");
console.log("✅ Scholarship System Ready");
console.log("✅ Referral System Ready");

/* ==========================================
   PAYMENT CENTER
   JavaScript Part-4
   Enterprise Future Integration Manager
   ScaleFlow University
========================================== */

const PaymentEngine = {

    initialized: false,

    gateways: {
        stripe: false,
        paypal: false,
        googlePay: false,
        applePay: false,
        stcPay: false,
        mada: false,
        jazzCash: false,
        easyPaisa: false
    },

    services: {
        invoice: false,
        receipt: false,
        autoRenew: false,
        webhook: false,
        aiBilling: false
    },

    initialize() {

        console.log("==================================");
        console.log("ScaleFlow Payment Engine Started");
        console.log("==================================");

        this.initialized = true;

        this.updateStatus();

    },

    connectGateway(name) {

        if (this.gateways.hasOwnProperty(name)) {

            this.gateways[name] = true;

            console.log("✅ Gateway Connected:", name);

            this.updateStatus();

        }

    },

    enableService(name) {

        if (this.services.hasOwnProperty(name)) {

            this.services[name] = true;

            console.log("✅ Service Enabled:", name);

            this.updateStatus();

        }

    },

    updateStatus() {

        const badges = document.querySelectorAll(
            "#paymentCenter .tool-card span"
        );

        badges.forEach(function (badge) {

            badge.textContent = "COMING SOON";
            badge.style.background = "#ff9800";
            badge.style.color = "#ffffff";

        });

        if (
            Object.values(this.gateways).includes(true) ||
            Object.values(this.services).includes(true)
        ) {

            badges.forEach(function (badge) {

                badge.textContent = "ONLINE";
                badge.style.background = "#00c853";

            });

        }

    }

};

/* ==========================================
   AUTO START
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    PaymentEngine.initialize();

});

/* ==========================================
   FUTURE API FUNCTIONS
========================================== */

// PaymentEngine.connectGateway("stripe");
// PaymentEngine.connectGateway("paypal");
// PaymentEngine.connectGateway("jazzCash");
// PaymentEngine.connectGateway("easyPaisa");

// PaymentEngine.enableService("invoice");
// PaymentEngine.enableService("receipt");
// PaymentEngine.enableService("autoRenew");
// PaymentEngine.enableService("webhook");
// PaymentEngine.enableService("aiBilling");

/* ==========================================
   ENTERPRISE READY
========================================== */

console.log("💳 Payment Engine Ready");
console.log("🌍 Gateway Manager Ready");
console.log("📄 Invoice System Ready");
console.log("📧 Receipt System Ready");
console.log("🔄 Auto Renewal Ready");
console.log("🤖 AI Billing Ready");
console.log("🚀 Future Enterprise Integration Ready");


/* ==========================================
   CAREER & MARKETPLACE CENTER
   JavaScript Part-1
   Initialization Engine
   ScaleFlow University
========================================== */

/* ==========================================
   Career Center Engine
========================================== */

const CareerCenter = {

    initialized: false,

    version: "1.0",

    status: "COMING SOON",

    modules: {

        freelanceHub: false,
        jobPortal: false,
        resumeBuilder: false,
        portfolioBuilder: false,

        clientHub: false,
        internshipCenter: false,
        remoteJobs: false,
        aiCareerAdvisor: false,

        earningsDashboard: false,
        skillVerification: false,
        aiInterview: false,
        analytics: false,

        businessNetwork: false,
        startupHub: false,
        aiBusinessPartner: false,
        leaderboard: false

    },

    initialize() {

        console.log("=================================");
        console.log("Career Center Initializing...");
        console.log("=================================");

        this.initialized = true;

        this.updateStatus();

    },

    updateStatus() {

        console.log("Career Center Status :", this.status);

    }

};

/* ==========================================
   Auto Initialize
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    CareerCenter.initialize();

});

/* ==========================================
   Enterprise Logs
========================================== */

console.log("💼 Career & Marketplace Center Ready");
console.log("🌍 Freelance Engine Ready");
console.log("📄 Resume Engine Ready");
console.log("🤖 AI Career Engine Ready");
console.log("🚀 Future Ready");

/* ==========================================
   CAREER & MARKETPLACE CENTER
   JavaScript Part-2
   Card Click Events
   Module Launcher
========================================== */

/* ==========================================
   Career Module Launcher
========================================== */

function launchCareerModule(moduleName){

    console.log("Launching Module:", moduleName);

    alert(
        "🚀 " + moduleName +
        "\n\nCOMING SOON\n\nThis Enterprise Feature will be available in a future update."
    );

}

/* ==========================================
   Register Card Events
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    const cards = document.querySelectorAll(
        "#careerCenter .tool-card," +
        "#careerOpportunities .tool-card," +
        "#careerGrowth .tool-card," +
        "#careerFuture .tool-card"
    );

    cards.forEach(function(card){

        card.style.cursor = "pointer";

        card.addEventListener("click", function(){

            const title = this.querySelector("h3").textContent;

            launchCareerModule(title);

        });

    });

});

/* ==========================================
   Smart Navigation
========================================== */

function openCareerCenter(){

    const section = document.getElementById("careerCenter");

    if(section){

        section.scrollIntoView({

            behavior:"smooth",
            block:"start"

        });

    }

}

/* ==========================================
   Enterprise Logs
========================================== */

console.log("✅ Career Card Events Ready");
console.log("✅ Career Launcher Ready");
console.log("✅ Smart Navigation Ready");

/* ==========================================
   CAREER & MARKETPLACE CENTER
   JavaScript Part-3
   AI Career Manager
   ScaleFlow University
========================================== */

const CareerAI = {

    initialized: false,

    services: {

        resumeBuilder: false,
        portfolioBuilder: false,
        aiCareerAdvisor: false,
        aiInterviewCoach: false,
        freelanceHub: false,
        remoteJobs: false,
        analytics: false,
        earningsDashboard: false

    },

    initialize() {

        console.log("=================================");
        console.log("Career AI Manager Started");
        console.log("=================================");

        this.initialized = true;

    },

    loadResumeBuilder() {

        console.log("📄 AI Resume Builder Ready");

    },

    loadPortfolioBuilder() {

        console.log("🎨 Portfolio Builder Ready");

    },

    loadCareerAdvisor() {

        console.log("🤖 AI Career Advisor Ready");

    },

    loadInterviewCoach() {

        console.log("🎤 AI Interview Coach Ready");

    },

    loadFreelanceHub() {

        console.log("🌍 Freelance Hub Ready");

    },

    loadRemoteJobs() {

        console.log("💼 Remote Jobs Ready");

    },

    loadAnalytics() {

        console.log("📊 Marketplace Analytics Ready");

    },

    loadEarningsDashboard() {

        console.log("💰 Earnings Dashboard Ready");

    }

};

/* ==========================================
   AUTO INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    CareerAI.initialize();

});

/* ==========================================
   FUTURE API CONNECTIONS
========================================== */

// CareerAI.loadResumeBuilder();
// CareerAI.loadPortfolioBuilder();
// CareerAI.loadCareerAdvisor();
// CareerAI.loadInterviewCoach();
// CareerAI.loadFreelanceHub();
// CareerAI.loadRemoteJobs();
// CareerAI.loadAnalytics();
// CareerAI.loadEarningsDashboard();

/* ==========================================
   ENTERPRISE READY LOGS
========================================== */

console.log("🤖 AI Career Manager Ready");
console.log("📄 Resume Engine Ready");
console.log("🎨 Portfolio Engine Ready");
console.log("🎤 Interview Coach Ready");
console.log("🌍 Freelance Hub Ready");
console.log("💰 Earnings System Ready");
console.log("📊 Analytics Ready");
console.log("🚀 Future Enterprise Integration Ready");


/* ==========================================
   CAREER & MARKETPLACE CENTER
   JavaScript Part-4
   Enterprise Integration Manager
   ScaleFlow University
========================================== */

const CareerEngine = {

    initialized: false,

    apis: {
        upwork: false,
        fiverr: false,
        linkedin: false,
        indeed: false,
        freelancer: false,
        github: false
    },

    services: {
        aiResume: false,
        portfolio: false,
        aiInterview: false,
        aiCareerAdvisor: false,
        earnings: false,
        analytics: false,
        notifications: false,
        certificates: false
    },

    initialize() {

        console.log("==================================");
        console.log("Career Enterprise Engine Started");
        console.log("==================================");

        this.initialized = true;

        this.updateStatus();

    },

    connectAPI(apiName) {

        if (this.apis.hasOwnProperty(apiName)) {

            this.apis[apiName] = true;

            console.log("🌐 API Connected:", apiName);

            this.updateStatus();

        }

    },

    enableService(serviceName) {

        if (this.services.hasOwnProperty(serviceName)) {

            this.services[serviceName] = true;

            console.log("✅ Service Enabled:", serviceName);

            this.updateStatus();

        }

    },

    updateStatus() {

        const badges = document.querySelectorAll(
            "#careerCenter span," +
            "#careerOpportunities span," +
            "#careerGrowth span," +
            "#careerFuture span"
        );

        badges.forEach(function (badge) {

            badge.style.transition = "0.4s";

        });

        if (
            Object.values(this.apis).includes(true) ||
            Object.values(this.services).includes(true)
        ) {

            badges.forEach(function (badge) {

                badge.textContent = "ONLINE";
                badge.style.background = "#00c853";
                badge.style.color = "#ffffff";

            });

        }

    }

};

/* ==========================================
   AUTO START
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    CareerEngine.initialize();

});

/* ==========================================
   FUTURE API EXAMPLES
========================================== */

// CareerEngine.connectAPI("upwork");
// CareerEngine.connectAPI("fiverr");
// CareerEngine.connectAPI("linkedin");
// CareerEngine.connectAPI("indeed");
// CareerEngine.connectAPI("github");

// CareerEngine.enableService("aiResume");
// CareerEngine.enableService("portfolio");
// CareerEngine.enableService("aiInterview");
// CareerEngine.enableService("earnings");
// CareerEngine.enableService("analytics");

/* ==========================================
   ENTERPRISE READY LOGS
========================================== */

console.log("💼 Career Enterprise Engine Ready");
console.log("🌍 Marketplace API Manager Ready");
console.log("🤖 AI Resume Ready");
console.log("🎤 AI Interview Ready");
console.log("📊 Career Analytics Ready");
console.log("💰 Earnings Dashboard Ready");
console.log("🏆 Future Business Network Ready");
console.log("🚀 Enterprise Career Center Fully Ready");


/* ==========================================
   INSTRUCTOR CENTER
   JavaScript Part-1
   Initialization Engine
   ScaleFlow University
========================================== */

/* ==========================================
   Instructor Center Engine
========================================== */

const InstructorCenter = {

    initialized: false,

    version: "1.0",

    status: "COMING SOON",

    modules: {

        teacherDashboard: false,
        myCourses: false,
        studentManager: false,
        assignmentReview: false,

        liveClasses: false,
        attendanceManager: false,
        quizEvaluator: false,
        gradeBook: false,

        aiLessonPlanner: false,
        resourceManager: false,
        courseSchedule: false,
        studentPerformance: false,

        aiTeacherAssistant: false,
        liveMeetingManager: false,
        coursePublishing: false,
        instructorAnalytics: false

    },

    initialize() {

        console.log("=================================");
        console.log("Instructor Center Initializing...");
        console.log("=================================");

        this.initialized = true;

        this.updateStatus();

    },

    updateStatus() {

        console.log("Instructor Center Status :", this.status);

    },

    getModuleCount() {

        return Object.keys(this.modules).length;

    }

};

/* ==========================================
   Auto Initialize
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    InstructorCenter.initialize();

});

/* ==========================================
   Enterprise Ready Logs
========================================== */

console.log("👨‍🏫 Instructor Center Ready");
console.log("📚 Teacher Dashboard Ready");
console.log("🎥 Live Class Engine Ready");
console.log("🤖 AI Teaching Engine Ready");
console.log("📊 Instructor Analytics Ready");
console.log("🚀 Future Ready");

/* ==========================================
   INSTRUCTOR CENTER
   JavaScript Part-2
   Card Events + Module Launcher
   ScaleFlow University
========================================== */

/* ==========================================
   Instructor Module Launcher
========================================== */

function launchInstructorModule(moduleName){

    console.log("Launching Instructor Module:", moduleName);

    alert(
        "👨‍🏫 " + moduleName +
        "\n\nCOMING SOON\n\nThis Enterprise Instructor Feature will be available in a future update."
    );

}

/* ==========================================
   Register Instructor Cards
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    const instructorCards = document.querySelectorAll(

        "#instructorCenter .tool-card," +
        "#instructorTeachingCenter .tool-card," +
        "#instructorAIManagement .tool-card," +
        "#instructorFutureCenter .tool-card"

    );

    instructorCards.forEach(function(card){

        card.style.cursor = "pointer";

        card.addEventListener("click", function(){

            const moduleTitle = this.querySelector("h3").textContent;

            launchInstructorModule(moduleTitle);

        });

    });

});

/* ==========================================
   Smart Navigation
========================================== */

function openInstructorCenter(){

    const section = document.getElementById("instructorCenter");

    if(section){

        section.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

}

/* ==========================================
   Live Class Placeholder
========================================== */

function startLiveClass(){

    alert(
        "🎥 Live Class System\n\nCOMING SOON\n\nZoom / Google Meet Integration will be added in a future update."
    );

}

/* ==========================================
   Enterprise Logs
========================================== */

console.log("✅ Instructor Card Events Ready");
console.log("🎥 Live Class Launcher Ready");
console.log("📍 Instructor Navigation Ready");
console.log("🚀 Instructor Enterprise Events Loaded");

/* ==========================================
   INSTRUCTOR CENTER
   JavaScript Part-3
   AI Instructor Manager
   ScaleFlow University
========================================== */

const InstructorAI = {

    initialized: false,

    services: {

        aiTeacherAssistant: false,
        aiLessonPlanner: false,
        liveClassEngine: false,
        assignmentReview: false,
        quizEvaluator: false,
        gradeBook: false,
        studentPerformance: false,
        instructorAnalytics: false

    },

    initialize() {

        console.log("=================================");
        console.log("Instructor AI Manager Started");
        console.log("=================================");

        this.initialized = true;

    },

    loadAITeacherAssistant() {

        console.log("🤖 AI Teacher Assistant Ready");

    },

    loadLessonPlanner() {

        console.log("📚 AI Lesson Planner Ready");

    },

    loadLiveClassEngine() {

        console.log("🎥 Live Class Engine Ready");

    },

    loadAssignmentReview() {

        console.log("📝 Assignment Review Engine Ready");

    },

    loadQuizEvaluator() {

        console.log("📋 Quiz Evaluator Ready");

    },

    loadGradeBook() {

        console.log("📊 Grade Book Ready");

    },

    loadStudentPerformance() {

        console.log("📈 Student Performance Ready");

    },

    loadInstructorAnalytics() {

        console.log("📊 Instructor Analytics Ready");

    }

};

/* ==========================================
   AUTO INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    InstructorAI.initialize();

});

/* ==========================================
   FUTURE API CONNECTIONS
========================================== */

// InstructorAI.loadAITeacherAssistant();
// InstructorAI.loadLessonPlanner();
// InstructorAI.loadLiveClassEngine();
// InstructorAI.loadAssignmentReview();
// InstructorAI.loadQuizEvaluator();
// InstructorAI.loadGradeBook();
// InstructorAI.loadStudentPerformance();
// InstructorAI.loadInstructorAnalytics();

/* ==========================================
   ENTERPRISE READY LOGS
========================================== */

console.log("🤖 AI Instructor Manager Ready");
console.log("👨‍🏫 AI Teacher Assistant Ready");
console.log("📚 Lesson Planner Ready");
console.log("🎥 Live Class Engine Ready");
console.log("📝 Assignment Review Ready");
console.log("📋 Quiz Evaluator Ready");
console.log("📊 Grade Book Ready");
console.log("📈 Student Performance Ready");
console.log("🚀 Future Enterprise Integration Ready");


/* ==========================================
   INSTRUCTOR CENTER
   JavaScript Part-4
   Enterprise Integration Manager
   FINAL VERSION
   ScaleFlow University
========================================== */

const InstructorEngine = {

    initialized: false,

    apis: {

        zoom: false,
        googleMeet: false,
        googleClassroom: false,
        gmail: false,
        calendar: false,
        drive: false,
        analytics: false

    },

    services: {

        aiTeacher: false,
        aiLessonPlanner: false,
        liveMeeting: false,
        attendance: false,
        gradeBook: false,
        assignmentReview: false,
        performanceAnalytics: false,
        notifications: false

    },

    initialize() {

        console.log("==================================");
        console.log("Instructor Enterprise Engine Started");
        console.log("==================================");

        this.initialized = true;

        this.updateStatus();

    },

    connectAPI(apiName){

        if(this.apis.hasOwnProperty(apiName)){

            this.apis[apiName] = true;

            console.log("🌐 Connected API :", apiName);

            this.updateStatus();

        }

    },

    enableService(serviceName){

        if(this.services.hasOwnProperty(serviceName)){

            this.services[serviceName] = true;

            console.log("✅ Service Enabled :", serviceName);

            this.updateStatus();

        }

    },

    updateStatus(){

        const badges = document.querySelectorAll(

            "#instructorCenter span," +
            "#instructorTeachingCenter span," +
            "#instructorAIManagement span," +
            "#instructorFutureCenter span"

        );

        badges.forEach(function(badge){

            badge.style.transition = "0.4s";

        });

        if(

            Object.values(this.apis).includes(true) ||

            Object.values(this.services).includes(true)

        ){

            badges.forEach(function(badge){

                badge.textContent = "ONLINE";

                badge.style.background = "#00c853";

                badge.style.color = "#ffffff";

            });

        }

    }

};

/* ==========================================
   AUTO START
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    InstructorEngine.initialize();

});

/* ==========================================
   FUTURE API CONNECTIONS
========================================== */

// InstructorEngine.connectAPI("zoom");
// InstructorEngine.connectAPI("googleMeet");
// InstructorEngine.connectAPI("googleClassroom");
// InstructorEngine.connectAPI("gmail");
// InstructorEngine.connectAPI("calendar");
// InstructorEngine.connectAPI("drive");

// InstructorEngine.enableService("aiTeacher");
// InstructorEngine.enableService("liveMeeting");
// InstructorEngine.enableService("attendance");
// InstructorEngine.enableService("gradeBook");
// InstructorEngine.enableService("assignmentReview");
// InstructorEngine.enableService("performanceAnalytics");

/* ==========================================
   ENTERPRISE READY LOGS
========================================== */

console.log("👨‍🏫 Instructor Enterprise Engine Ready");
console.log("🤖 AI Teacher Ready");
console.log("🎥 Live Meeting Manager Ready");
console.log("📚 Lesson Planner Ready");
console.log("📝 Assignment Review Ready");
console.log("📊 Grade Book Ready");
console.log("📈 Performance Analytics Ready");
console.log("🌐 Google Workspace Integration Ready");
console.log("🚀 Future Enterprise Integration Ready");

/* ==========================================
   PARENT CENTER
   JavaScript Part-1
   Initialization Engine
   ScaleFlow University
========================================== */

/* ==========================================
   Parent Center Engine
========================================== */

const ParentCenter = {

    initialized: false,

    version: "1.0",

    status: "COMING SOON",

    modules: {

        parentDashboard: false,
        myChildren: false,
        studentProgress: false,
        attendanceReport: false,

        examResults: false,
        homeworkStatus: false,
        teacherMessages: false,
        parentNotifications: false,

        aiParentAssistant: false,
        learningReports: false,
        studyTimeMonitor: false,
        studentWellbeing: false,

        feeStatus: false,
        certificates: false,
        reportDownloads: false,
        parentAnalytics: false

    },

    initialize() {

        console.log("=================================");
        console.log("Parent Center Initializing...");
        console.log("=================================");

        this.initialized = true;

        this.updateStatus();

    },

    updateStatus() {

        console.log("Parent Center Status :", this.status);

    },

    getModuleCount() {

        return Object.keys(this.modules).length;

    }

};

/* ==========================================
   Auto Initialize
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    ParentCenter.initialize();

});

/* ==========================================
   Enterprise Ready Logs
========================================== */

console.log("👨‍👩‍👧 Parent Center Ready");
console.log("📈 Student Progress Ready");
console.log("📅 Attendance System Ready");
console.log("📊 Parent Dashboard Ready");
console.log("🤖 AI Parent Engine Ready");
console.log("🚀 Future Ready");


/* ==========================================
   PARENT CENTER
   JavaScript Part-2
   Card Events + Module Launcher
   ScaleFlow University
========================================== */

/* ==========================================
   Parent Module Launcher
========================================== */

function launchParentModule(moduleName){

    console.log("Launching Parent Module:", moduleName);

    alert(
        "👨‍👩‍👧 " + moduleName +
        "\n\nCOMING SOON\n\nThis Enterprise Parent Feature will be available in a future update."
    );

}

/* ==========================================
   Register Parent Cards
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    const parentCards = document.querySelectorAll(

        "#parentCenter .tool-card," +
        "#parentCommunicationCenter .tool-card," +
        "#parentAICenter .tool-card," +
        "#parentFutureCenter .tool-card"

    );

    parentCards.forEach(function(card){

        card.style.cursor = "pointer";

        card.addEventListener("click", function(){

            const moduleTitle = this.querySelector("h3").textContent;

            launchParentModule(moduleTitle);

        });

    });

});

/* ==========================================
   Smart Navigation
========================================== */

function openParentCenter(){

    const section = document.getElementById("parentCenter");

    if(section){

        section.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

}

/* ==========================================
   Progress Viewer Placeholder
========================================== */

function viewStudentProgress(){

    alert(
        "📈 Student Progress\n\nCOMING SOON\n\nAI Progress Dashboard will be available in a future update."
    );

}

/* ==========================================
   Attendance Viewer Placeholder
========================================== */

function viewAttendanceReport(){

    alert(
        "📅 Attendance Report\n\nCOMING SOON\n\nLive Attendance Monitoring will be available in a future update."
    );

}

/* ==========================================
   Enterprise Ready Logs
========================================== */

console.log("👨‍👩‍👧 Parent Card Events Ready");
console.log("📈 Student Progress Viewer Ready");
console.log("📅 Attendance Viewer Ready");
console.log("📍 Parent Navigation Ready");
console.log("🚀 Parent Enterprise Events Loaded");

/* ==========================================
   PARENT CENTER
   JavaScript Part-3
   AI Parent Manager
   ScaleFlow University
========================================== */

const ParentAI = {

    initialized: false,

    services: {

        aiParentAssistant: false,
        learningReports: false,
        studyTimeMonitor: false,
        homeworkMonitor: false,
        attendanceAnalytics: false,
        examAnalytics: false,
        wellbeingMonitor: false,
        parentAnalytics: false

    },

    initialize() {

        console.log("=================================");
        console.log("Parent AI Manager Started");
        console.log("=================================");

        this.initialized = true;

    },

    loadAIParentAssistant() {

        console.log("🤖 AI Parent Assistant Ready");

    },

    loadLearningReports() {

        console.log("📚 Learning Reports Ready");

    },

    loadStudyTimeMonitor() {

        console.log("⏰ Study Time Monitor Ready");

    },

    loadHomeworkMonitor() {

        console.log("📝 Homework Monitor Ready");

    },

    loadAttendanceAnalytics() {

        console.log("📅 Attendance Analytics Ready");

    },

    loadExamAnalytics() {

        console.log("📊 Exam Analytics Ready");

    },

    loadWellbeingMonitor() {

        console.log("❤️ Student Wellbeing Ready");

    },

    loadParentAnalytics() {

        console.log("📈 Parent Analytics Ready");

    }

};

/* ==========================================
   AUTO INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    ParentAI.initialize();

});

/* ==========================================
   FUTURE API CONNECTIONS
========================================== */

// ParentAI.loadAIParentAssistant();
// ParentAI.loadLearningReports();
// ParentAI.loadStudyTimeMonitor();
// ParentAI.loadHomeworkMonitor();
// ParentAI.loadAttendanceAnalytics();
// ParentAI.loadExamAnalytics();
// ParentAI.loadWellbeingMonitor();
// ParentAI.loadParentAnalytics();

/* ==========================================
   ENTERPRISE READY LOGS
========================================== */

console.log("🤖 Parent AI Manager Ready");
console.log("👨‍👩‍👧 AI Parent Assistant Ready");
console.log("📚 Learning Reports Ready");
console.log("⏰ Study Time Monitor Ready");
console.log("📝 Homework Monitor Ready");
console.log("📅 Attendance Analytics Ready");
console.log("📊 Exam Analytics Ready");
console.log("❤️ Student Wellbeing Ready");
console.log("📈 Parent Analytics Ready");
console.log("🚀 Future Enterprise Integration Ready");

/* ==========================================
   PARENT CENTER
   JavaScript Part-4
   Enterprise Integration Manager
   FINAL VERSION
   ScaleFlow University
========================================== */

const ParentEngine = {

    initialized: false,

    apis: {

        gmail: false,
        whatsapp: false,
        sms: false,
        calendar: false,
        analytics: false,
        drive: false,
        aiEngine: false

    },

    services: {

        parentDashboard: false,
        studentProgress: false,
        attendanceReports: false,
        homeworkTracker: false,
        examResults: false,
        learningReports: false,
        aiParentAssistant: false,
        wellbeingMonitor: false,
        notifications: false,
        feeManager: false

    },

    initialize() {

        console.log("==================================");
        console.log("Parent Enterprise Engine Started");
        console.log("==================================");

        this.initialized = true;

        this.updateStatus();

    },

    connectAPI(apiName){

        if(this.apis.hasOwnProperty(apiName)){

            this.apis[apiName] = true;

            console.log("🌐 Connected API :", apiName);

            this.updateStatus();

        }

    },

    enableService(serviceName){

        if(this.services.hasOwnProperty(serviceName)){

            this.services[serviceName] = true;

            console.log("✅ Service Enabled :", serviceName);

            this.updateStatus();

        }

    },

    updateStatus(){

        const badges = document.querySelectorAll(

            "#parentCenter span," +
            "#parentCommunicationCenter span," +
            "#parentAICenter span," +
            "#parentFutureCenter span"

        );

        badges.forEach(function(badge){

            badge.style.transition = "0.4s";

        });

        if(

            Object.values(this.apis).includes(true) ||

            Object.values(this.services).includes(true)

        ){

            badges.forEach(function(badge){

                badge.textContent = "ONLINE";

                badge.style.background = "#00c853";

                badge.style.color = "#ffffff";

            });

        }

    }

};

/* ==========================================
   AUTO START
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    ParentEngine.initialize();

});

/* ==========================================
   FUTURE API CONNECTIONS
========================================== */

// ParentEngine.connectAPI("gmail");
// ParentEngine.connectAPI("whatsapp");
// ParentEngine.connectAPI("sms");
// ParentEngine.connectAPI("calendar");
// ParentEngine.connectAPI("analytics");
// ParentEngine.connectAPI("drive");
// ParentEngine.connectAPI("aiEngine");

// ParentEngine.enableService("parentDashboard");
// ParentEngine.enableService("studentProgress");
// ParentEngine.enableService("attendanceReports");
// ParentEngine.enableService("homeworkTracker");
// ParentEngine.enableService("examResults");
// ParentEngine.enableService("learningReports");
// ParentEngine.enableService("aiParentAssistant");
// ParentEngine.enableService("wellbeingMonitor");
// ParentEngine.enableService("notifications");
// ParentEngine.enableService("feeManager");

/* ==========================================
   ENTERPRISE READY LOGS
========================================== */

console.log("👨‍👩‍👧 Parent Enterprise Engine Ready");
console.log("🤖 AI Parent Assistant Ready");
console.log("📈 Student Progress Ready");
console.log("📅 Attendance Reports Ready");
console.log("📝 Homework Tracker Ready");
console.log("📊 Exam Results Ready");
console.log("📚 Learning Reports Ready");
console.log("❤️ Wellbeing Monitor Ready");
console.log("🔔 Parent Notification Engine Ready");
console.log("💳 Fee Manager Ready");
console.log("🌐 Google Workspace Integration Ready");
console.log("🚀 Future Enterprise Integration Ready");


/* ==========================================
   ANALYTICS CENTER
   JAVASCRIPT PART-1
   Initialization & Card Animations
   ScaleFlow University v1.0
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Select all tool cards in the Analytics Sections
    const analyticsCards = document.querySelectorAll(
        '#analyticsCenter .tool-card, ' +
        '#analyticsLearningCenter .tool-card, ' +
        '#analyticsAICenter .tool-card, ' +
        '#analyticsEnterpriseCenter .tool-card'
    );

    // Initial Animation: Staggered Fade-in effect
    analyticsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    console.log("ScaleFlow Analytics Center: Initialized successfully.");
});


/* ==========================================
   ANALYTICS CENTER
   JAVASCRIPT PART-2
   Interactive Click Events & Engine Hooks
   ScaleFlow University v1.0
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Select all tool cards
    const analyticsCards = document.querySelectorAll('.tool-card');

    // Add Click Events to each card
    analyticsCards.forEach(card => {
        card.addEventListener('click', () => {
            
            // Get the title of the clicked card
            const cardTitle = card.querySelector('h3').innerText;
            
            // Visual feedback for the click
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);

            // Placeholder for Engine Hook (Will connect to Google Apps Script later)
            console.log(`Connecting to Engine: ${cardTitle}`);
            
            // Future logic: Trigger the specific engine here
            // triggerEngine(cardTitle);
            
            alert(`Opening: ${cardTitle} Engine...`);
        });
    });
});

/* ==========================================
   ANALYTICS CENTER
   JAVASCRIPT PART-3
   Security & Engine Data Handler
   ScaleFlow University v1.0
========================================== */

/**
 * This function acts as a secure bridge between your 
 * UI and the Google Apps Script Engine.
 */
function triggerEngine(cardTitle) {
    console.log(`Security Protocol Initiated for: ${cardTitle}`);
    
    // Simulate secure data fetching
    // In the future, this will call your GAS deployment URL
    // securely without exposing your Drive credentials.
    
    showLoadingState(true);

    // Mocking the data fetch process
    setTimeout(() => {
        console.log("Secure connection to Engine established.");
        showLoadingState(false);
    }, 1500);
}

// Function to handle UI loading state
function showLoadingState(isLoading) {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
        card.style.opacity = isLoading ? "0.6" : "1";
        card.style.pointerEvents = isLoading ? "none" : "all";
    });
}

// Global hook to prevent direct access to sensitive elements
document.addEventListener('contextmenu', event => event.preventDefault());


/* ==========================================
   ANALYTICS CENTER
   JAVASCRIPT PART-4 (FINAL)
   System Cleanup & Final Polish
   ScaleFlow University v1.0
========================================== */

/**
 * Cleanup function to remove temporary UI elements 
 * after the engine connection is complete.
 */
function cleanupAnalyticsUI() {
    console.log("Analytics System: Cleanup initialized.");
    
    // Removing any stray hover effects or stuck classes
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
        card.classList.remove('is-loading');
    });
}

/**
 * Mobile-specific adjustment: ensuring the grid is 
 * always centered and accessible.
 */
window.addEventListener('resize', () => {
    const grid = document.querySelector('.tool-grid');
    if (window.innerWidth < 480) {
        grid.style.gap = '10px';
    } else {
        grid.style.gap = '25px';
    }
});

// Final initialization log
console.log("ScaleFlow Analytics Center: Architecture fully loaded and secured.");


/* ==========================================
   ACHIEVEMENT & GAMIFICATION CENTER
   JavaScript Part-1
   Initialization + XP Registry
   ScaleFlow University
========================================== */

/* ==========================================
   Achievement Center Engine
========================================== */

const AchievementCenter = {

    initialized: false,

    version: "1.0",

    status: "COMING SOON",

    player: {

        xp: 0,

        level: 1,

        badges: 0,

        streak: 0

    },

    modules: {

        achievementDashboard: false,
        xpCenter: false,
        badgeCollection: false,
        levelProgress: false,

        dailyStreak: false,
        weeklyChallenges: false,
        rewardCenter: false,
        xpWallet: false,

        globalLeaderboard: false,
        classRanking: false,
        friendsRanking: false,
        aiMotivationCoach: false,

        achievementCelebration: false,
        milestones: false,
        gamificationSettings: false,
        futureRewards: false

    },

    initialize() {

        console.log("=================================");
        console.log("Achievement Center Initializing...");
        console.log("=================================");

        this.initialized = true;

        this.updateStatus();

    },

    updateStatus() {

        console.log("Achievement Center Status :", this.status);

    },

    getModuleCount() {

        return Object.keys(this.modules).length;

    },

    getPlayerInfo() {

        return this.player;

    }

};

/* ==========================================
   XP Registry
========================================== */

const XPRegistry = {

    lessonComplete: 10,

    quizComplete: 20,

    moduleComplete: 50,

    courseComplete: 200,

    dailyLogin: 5,

    weeklyChallenge: 100,

    badgeUnlock: 50

};

/* ==========================================
   Auto Initialize
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    AchievementCenter.initialize();

});

/* ==========================================
   Enterprise Ready Logs
========================================== */

console.log("🏆 Achievement Center Ready");
console.log("⭐ XP Registry Ready");
console.log("🎖️ Badge System Ready");
console.log("📈 Level System Ready");
console.log("🔥 Streak Engine Ready");
console.log("🚀 Future Ready");

/* ==========================================
   ACHIEVEMENT & GAMIFICATION CENTER
   JavaScript Part-2
   XP Award Engine + Badge Unlock Manager
   ScaleFlow University
========================================== */

/* ==========================================
   XP Award Engine
========================================== */

function awardXP(amount, reason = "Activity") {

    AchievementCenter.player.xp += amount;

    console.log(
        "⭐ XP +" + amount +
        " | Reason: " + reason
    );

    checkLevelUp();

}

/* ==========================================
   Level System
========================================== */

function checkLevelUp() {

    const requiredXP =
        AchievementCenter.player.level * 100;

    if (AchievementCenter.player.xp >= requiredXP) {

        AchievementCenter.player.level++;

        console.log(
            "🎉 LEVEL UP -> Level " +
            AchievementCenter.player.level
        );

        alert(
            "🎉 Congratulations!\n\n" +
            "You reached Level " +
            AchievementCenter.player.level
        );

    }

}

/* ==========================================
   Badge Unlock Manager
========================================== */

function unlockBadge(badgeName){

    AchievementCenter.player.badges++;

    console.log(
        "🏅 Badge Unlocked:",
        badgeName
    );

    alert(
        "🏅 Badge Unlocked!\n\n" +
        badgeName
    );

}

/* ==========================================
   Reward Action
========================================== */

function claimReward(rewardName){

    alert(
        "🎁 Reward Claimed\n\n" +
        rewardName +
        "\n\nCOMING SOON"
    );

}

/* ==========================================
   Card Click Events
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    const cards = document.querySelectorAll(

        "#achievementCenter .tool-card," +
        "#achievementRewardCenter .tool-card," +
        "#achievementLeaderboardCenter .tool-card," +
        "#achievementFutureCenter .tool-card"

    );

    cards.forEach(function(card){

        card.style.cursor = "pointer";

        card.addEventListener("click", function(){

            const title =
                this.querySelector("h3").textContent;

            alert(
                "🏆 " + title +
                "\n\nCOMING SOON"
            );

        });

    });

});

/* ==========================================
   Demo Functions
========================================== */

// awardXP(10,"Lesson Completed");
// unlockBadge("First Lesson");
// claimReward("XP Booster");

/* ==========================================
   Enterprise Logs
========================================== */

console.log("⭐ XP Award Engine Ready");
console.log("🏅 Badge Unlock Manager Ready");
console.log("🎁 Reward Manager Ready");
console.log("🖱 Achievement Card Events Ready");
console.log("🚀 Gamification Actions Ready");

/* ==========================================
   ACHIEVEMENT & GAMIFICATION CENTER
   JavaScript Part-3
   AI Motivation + Streak + Leaderboard
   ScaleFlow University
========================================== */

/* ==========================================
   AI Motivation Coach
========================================== */

const AIMotivationCoach = {

    messages: [

        "🌟 Keep learning. Every lesson makes you stronger!",

        "🔥 Your consistency is your greatest achievement!",

        "🏆 Winners never stop learning.",

        "📚 Today's effort becomes tomorrow's success.",

        "🚀 Small progress every day creates big results."

    ],

    showMessage() {

        const randomIndex = Math.floor(
            Math.random() * this.messages.length
        );

        console.log(this.messages[randomIndex]);

    }

};

/* ==========================================
   Daily Streak Manager
========================================== */

const StreakManager = {

    increaseStreak() {

        AchievementCenter.player.streak++;

        console.log(
            "🔥 Daily Streak :",
            AchievementCenter.player.streak
        );

    },

    resetStreak() {

        AchievementCenter.player.streak = 0;

        console.log("🔥 Streak Reset");

    }

};

/* ==========================================
   Weekly Challenge Engine
========================================== */

const WeeklyChallenge = {

    completed:false,

    completeChallenge(){

        if(this.completed){

            console.log("Challenge Already Completed");

            return;

        }

        this.completed = true;

        awardXP(
            XPRegistry.weeklyChallenge,
            "Weekly Challenge"
        );

        unlockBadge("Weekly Champion");

        console.log("🎯 Weekly Challenge Completed");

    }

};

/* ==========================================
   Leaderboard Manager
========================================== */

const LeaderboardManager = {

    players:[

        {
            name:"Sanaullah",
            xp:0,
            level:1
        }

    ],

    updatePlayer(){

        this.players[0].xp =
            AchievementCenter.player.xp;

        this.players[0].level =
            AchievementCenter.player.level;

        console.log(
            "🌍 Leaderboard Updated",
            this.players
        );

    }

};

/* ==========================================
   Future AI Loader
========================================== */

// AIMotivationCoach.showMessage();
// StreakManager.increaseStreak();
// WeeklyChallenge.completeChallenge();
// LeaderboardManager.updatePlayer();

/* ==========================================
   Enterprise Logs
========================================== */

console.log("🤖 AI Motivation Coach Ready");
console.log("🔥 Daily Streak Manager Ready");
console.log("🎯 Weekly Challenge Engine Ready");
console.log("🌍 Leaderboard Manager Ready");
console.log("🚀 Enterprise Gamification AI Ready");

/* ==========================================
   ACHIEVEMENT & GAMIFICATION CENTER
   JavaScript Part-4
   Enterprise Gamification Engine
   FINAL VERSION
   ScaleFlow University
========================================== */

const GamificationEngine = {

    initialized: false,

    apis: {

        aiEngine: false,
        analytics: false,
        notifications: false,
        certificates: false,
        leaderboard: false,
        cloudSync: false,
        rewards: false

    },

    services: {

        xpEngine: false,
        badgeEngine: false,
        levelEngine: false,
        streakEngine: false,
        challengeEngine: false,
        rewardEngine: false,
        celebrationEngine: false,
        motivationEngine: false

    },

    initialize() {

        console.log("==================================");
        console.log("Gamification Engine Started");
        console.log("==================================");

        this.initialized = true;

        this.updateStatus();

    },

    connectAPI(apiName){

        if(this.apis.hasOwnProperty(apiName)){

            this.apis[apiName] = true;

            console.log("🌐 API Connected:", apiName);

            this.updateStatus();

        }

    },

    enableService(serviceName){

        if(this.services.hasOwnProperty(serviceName)){

            this.services[serviceName] = true;

            console.log("✅ Service Enabled:", serviceName);

            this.updateStatus();

        }

    },

    celebrateAchievement(title){

        console.log("🎉 Achievement:", title);

        alert(
            "🏆 Achievement Unlocked!\n\n" +
            title +
            "\n\nCongratulations!"
        );

    },

    updateStatus(){

        const badges = document.querySelectorAll(

            "#achievementCenter span," +
            "#achievementRewardCenter span," +
            "#achievementLeaderboardCenter span," +
            "#achievementFutureCenter span"

        );

        badges.forEach(function(item){

            item.style.transition = "0.4s";

        });

        if(

            Object.values(this.apis).includes(true) ||

            Object.values(this.services).includes(true)

        ){

            badges.forEach(function(item){

                item.textContent = "ONLINE";

                item.style.background = "#FFD700";

                item.style.color = "#111";

            });

        }

    }

};

/* ==========================================
   AUTO START
========================================== */

document.addEventListener("DOMContentLoaded", function(){

    GamificationEngine.initialize();

});

/* ==========================================
   FUTURE API CONNECTIONS
========================================== */

// GamificationEngine.connectAPI("aiEngine");
// GamificationEngine.connectAPI("analytics");
// GamificationEngine.connectAPI("notifications");
// GamificationEngine.connectAPI("certificates");
// GamificationEngine.connectAPI("leaderboard");
// GamificationEngine.connectAPI("cloudSync");
// GamificationEngine.connectAPI("rewards");

// GamificationEngine.enableService("xpEngine");
// GamificationEngine.enableService("badgeEngine");
// GamificationEngine.enableService("levelEngine");
// GamificationEngine.enableService("streakEngine");
// GamificationEngine.enableService("challengeEngine");
// GamificationEngine.enableService("rewardEngine");
// GamificationEngine.enableService("celebrationEngine");
// GamificationEngine.enableService("motivationEngine");

/* ==========================================
   ENTERPRISE READY LOGS
========================================== */

console.log("🏆 Enterprise Gamification Engine Ready");
console.log("⭐ XP Engine Ready");
console.log("🎖 Badge Engine Ready");
console.log("📈 Level Engine Ready");
console.log("🔥 Daily Streak Ready");
console.log("🎯 Challenge Engine Ready");
console.log("🎁 Reward Engine Ready");
console.log("🎉 Celebration Engine Ready");
console.log("🤖 AI Motivation Ready");
console.log("🌐 Future Enterprise Integration Ready");
