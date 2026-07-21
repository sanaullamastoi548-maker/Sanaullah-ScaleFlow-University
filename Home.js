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
modalBody.innerHTML = bodyHTML || 'No content';
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
 
window.addEventListener("load", function () {
    ScaleFlow.hideLoader();
});
    
/* ===== Parart1 ===== */
