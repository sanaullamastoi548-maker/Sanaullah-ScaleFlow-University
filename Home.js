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

    // Page sections — only those that exist in HTML
    const pageSections = {};
    document.querySelectorAll('.page-section').forEach(section => {
        pageSections[section.id] = section;
    });

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
        if (!modalContainer) return;
        modalTitle.textContent = title || 'Modal';
        modalBody.innerHTML = bodyHTML || 'No content';
        modalContainer.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (options.onOpen) options.onOpen();
    }

    function closeModal() {
        if (!modalContainer) return;
        modalContainer.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);
    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', function() {
            showToast('✅ Confirmed!', 'success');
            closeModal();
        });
    }
    if (modalContainer) {
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) closeModal();
        });
    }

    // ============================================================
    // 5. DARK MODE — تھیم تبدیل کریں اور محفوظ کریں
    // ============================================================
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        if (darkModeBtn) darkModeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }

    // پہلے سے محفوظ تھیم لوڈ کریں
    (function loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
            if (darkModeBtn) darkModeBtn.textContent = '☀️';
        }
    })();

    if (darkModeBtn) darkModeBtn.addEventListener('click', toggleDarkMode);

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
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar-menu a[data-page="${pageId}"]`);
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
    if (notificationBell && notificationPanel) {
        notificationBell.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationPanel.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            if (!notificationPanel.contains(e.target) && !notificationBell.contains(e.target)) {
                notificationPanel.classList.remove('open');
            }
        });
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            if (notificationCount) notificationCount.textContent = '0';
            showToast('✅ All notifications marked as read', 'success');
        });
    }

    // ============================================================
    // 8. SCROLL TOP — بٹن ظاہر/چھپائیں
    // ============================================================
    window.addEventListener('scroll', function() {
        if (scrollTopBtn) {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        }
    });
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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

    // لوڈر کو چھپائیں جب صفحہ مکمل لوڈ ہو جائے
    window.addEventListener('load', function() {
        hideLoader();
        // پہلا صفحہ (page1) کو فعال کریں اگر کوئی دوسرا نہ ہو
        const activePage = document.querySelector('.page-section.active');
        if (!activePage && pageSections.page1) {
            navigateTo('page1');
        }
    });

    console.log('✅ [Part 1] Core Foundation loaded successfully');

})(window);

/* ===== End of Part 1 ===== */
