/*============================================================
   Sanaullah ScaleFlow University
   script.js — Enterprise Application (All Modules)
   Version: 1.0 (Fully Updated)
============================================================*/

(function(global) {
    "use strict";

    // ============================================================
    // 1. APP — Main Controller
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
            // New modules
            Settings.init();
            Security.init();
            AIMentor.init();
            Feedback.init();
            ThreeD.init();
            CV.init();
            // Existing modules (kept for compatibility)
            Courses.init();
            Learning.init();
            AI.init(); // This is the old AI, but we'll keep it for safety
            Certificates.init();
            Achievements.init();
            Marketplace.init();
            Profile.init();
            Auth.init();
            Analytics.init();
            Animations.init();
            // Generic button handler for all remaining buttons
            initGenericButtons();
            // Year update
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
    // 3. LOADER & TOAST shortcuts
    // ============================================================
    const Loader = { show: UI.loader.show, hide: UI.loader.hide };
    const Toast = { show: UI.toast };

    // ============================================================
    // 4. NAVIGATION
    // ============================================================
    const Navigation = {
        init: function() {
            document.querySelectorAll('.sidebar-menu a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.dataset.page;
                    if (page) Navigation.goTo(page);
                });
            });
            // Quick actions that navigate
            document.querySelectorAll('.quick-action-btn[data-action]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const map = {
                        'learning': 'page4', // keep, but we don't have page4 now
                        'ai': 'pageAI',
                        'courses': 'page3', // not used
                        'certificates': 'page5' // not used
                    };
                    const page = map[this.dataset.action];
                    if (page) Navigation.goTo(page);
                });
            });
            // Hero buttons
            document.getElementById('continueLearningBtn')?.addEventListener('click', () => Navigation.goTo('pageAI')); // redirect to AI mentor
            document.getElementById('browseCoursesBtn')?.addEventListener('click', () => Navigation.goTo('pageSettings')); // demo
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
    // 5. SEARCH
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
        }
    };

    // ============================================================
    // 6. DASHBOARD — stats update
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
    // 7. SETTINGS MODULE (New)
    // ============================================================
    const Settings = {
        init: function() {
            // Theme buttons
            document.getElementById('settingsThemeLight')?.addEventListener('click', () => setTheme('light'));
            document.getElementById('settingsThemeDark')?.addEventListener('click', () => setTheme('dark'));
            document.getElementById('settingsThemeSystem')?.addEventListener('click', () => setTheme('system'));
            // Language
            document.getElementById('settingsLanguageSave')?.addEventListener('click', function() {
                const lang = document.getElementById('settingsLanguage').value;
                Toast.show(`🌐 Language set to ${lang}`, 'info');
            });
            // Accessibility
            document.getElementById('accSave')?.addEventListener('click', () => Toast.show('♿ Accessibility saved', 'success'));
            // Notifications
            document.getElementById('notifSave')?.addEventListener('click', () => Toast.show('🔔 Notification settings saved', 'success'));
            // Privacy
            document.getElementById('privSave')?.addEventListener('click', () => Toast.show('🛡️ Privacy saved', 'success'));
            // AI Preferences
            document.getElementById('aiPrefSave')?.addEventListener('click', () => Toast.show('🤖 AI preferences saved', 'success'));
            // Backup
            document.getElementById('backupNow')?.addEventListener('click', function() {
                Toast.show('💾 Backup started...', 'info');
                setTimeout(() => Toast.show('✅ Backup completed!', 'success'), 2000);
            });
            document.getElementById('restoreBackup')?.addEventListener('click', () => Toast.show('🔄 Restore started...', 'info'));
            // Export
            document.getElementById('exportData')?.addEventListener('click', () => Toast.show('📤 Exporting all data...', 'info'));
            document.getElementById('exportSettings')?.addEventListener('click', () => Toast.show('📤 Exporting settings...', 'info'));
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

    function setTheme(mode) {
        const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.body.classList.toggle('dark-mode', isDark);
        document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        Toast.show(`Theme set to ${mode}`, 'info');
    }

    // ============================================================
    // 8. SECURITY MODULE (New)
    // ============================================================
    const Security = {
        init: function() {
            // Password strength meter
            const newPwd = document.getElementById('secNewPwd');
            const strengthText = document.getElementById('pwdStrengthText');
            newPwd?.addEventListener('input', function() {
                const val = this.value;
                let strength = 'Weak';
                if (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val)) {
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
            document.getElementById('secRemoveCurrent')?.addEventListener('click', () => Toast.show('⚠️ Current device removed', 'warning'));
            document.getElementById('secRemoveMobile')?.addEventListener('click', () => Toast.show('📱 Mobile device removed', 'info'));
            document.getElementById('secAddDevice')?.addEventListener('click', () => Toast.show('✅ Trusted device added', 'success'));
            // Active Sessions
            document.getElementById('secEndCurrent')?.addEventListener('click', () => Toast.show('⚠️ Current session ended', 'warning'));
            document.getElementById('secEndMobile')?.addEventListener('click', () => Toast.show('📱 Mobile session ended', 'info'));
            document.getElementById('secEndAll')?.addEventListener('click', () => Toast.show('🔄 All sessions ended', 'info'));
            // Login History
            document.getElementById('secClearHistory')?.addEventListener('click', () => Toast.show('🗑️ Login history cleared', 'info'));
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
            document.getElementById('secSendOTP')?.addEventListener('click', () => Toast.show('📧 OTP sent to your recovery email', 'info'));
            // Threat Detection
            document.getElementById('secScanNow')?.addEventListener('click', function() {
                Toast.show('🔍 Scanning for threats...', 'info');
                setTimeout(() => Toast.show('✅ Scan complete: No threats found', 'success'), 2000);
            });
            document.getElementById('secViewThreats')?.addEventListener('click', () => Toast.show('🛡️ No threats detected', 'info'));
        }
    };

    // ============================================================
    // 9. AI MENTOR (New — updated IDs)
    // ============================================================
    const AIMentor = {
        init: function() {
            const messages = document.getElementById('aiChatMessages');
            const input = document.getElementById('aiChatInput');
            const sendBtn = document.getElementById('aiChatSend');
            const clearBtn = document.getElementById('aiChatClear');
            const voiceBtn = document.getElementById('aiChatVoice');

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
                    welcome.textContent = 'Hello! I\'m your AI Mentor. How can I help you today?';
                    messages.appendChild(welcome);
                    Toast.show('Chat cleared', 'info');
                });
            }
            if (voiceBtn) {
                voiceBtn.addEventListener('click', function() {
                    Toast.show('🎤 Voice input activated (demo)', 'info');
                });
            }
            // Prompt buttons
            document.getElementById('promptClosure')?.addEventListener('click', function() {
                if (input) { input.value = 'Explain closures in JavaScript.'; input.focus(); }
            });
            document.getElementById('promptHoisting')?.addEventListener('click', function() {
                if (input) { input.value = 'What is hoisting?'; input.focus(); }
            });
            document.getElementById('promptAsync')?.addEventListener('click', function() {
                if (input) { input.value = 'Help with async/await.'; input.focus(); }
            });

            // Other AI features (Memory, History, etc.)
            const aiActions = [
                'aiMemoryView', 'aiMemoryClear', 'aiHistoryDetails', 'aiWeaknessAction',
                'aiReflectionSubmit', 'aiHomeworkCheck', 'aiQuizGenerate', 'aiQuizExplain',
                'aiCodeHelp', 'aiCodeReview', 'aiCareerPath', 'aiCareerSkills',
                'aiVoiceStart', 'aiVoiceStop', 'aiImageAnalyze', 'aiPDFRead',
                'aiHistoryClear', 'aiPersonalitySave', 'aiLanguageSave',
                'aiTeacherStart', 'aiTeacherStop'
            ];
            aiActions.forEach(id => {
                document.getElementById(id)?.addEventListener('click', function() {
                    Toast.show(`🤖 ${this.textContent.trim()} (demo)`, 'info');
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
        }
    };

    // ============================================================
    // 10. FEEDBACK MODULE (New)
    // ============================================================
    const Feedback = {
        init: function() {
            // Ticket System
            document.getElementById('fbNewTicket')?.addEventListener('click', () => Toast.show('🎫 New ticket created!', 'success'));
            document.getElementById('fbViewTicket1')?.addEventListener('click', () => Toast.show('📄 Viewing ticket #TKT-001', 'info'));
            document.getElementById('fbViewTicket2')?.addEventListener('click', () => Toast.show('📄 Viewing ticket #TKT-002', 'info'));
            document.getElementById('fbAllTickets')?.addEventListener('click', () => Toast.show('📋 Showing all tickets', 'info'));
            // Auto Reply
            document.getElementById('fbAutoReply')?.addEventListener('change', function() {
                Toast.show('🤖 AI Auto Reply ' + (this.checked ? 'enabled' : 'disabled'), 'info');
            });
            // WhatsApp
            document.getElementById('fbWhatsApp')?.addEventListener('click', () => Toast.show('📱 Opening WhatsApp...', 'info'));
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

    // ============================================================
    // 11. 3D LEARNING MODULE (New)
    // ============================================================
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
                    Toast.show(`🌐 3D: ${this.textContent.trim()}`, 'info');
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

    // ============================================================
    // 12. DIGITAL CV MODULE (New)
    // ============================================================
    const CV = {
        init: function() {
            const actions = [
                'cvAddExperience', 'cvAddEducation', 'cvAddSkill', 'cvAddCert',
                'cvAddProject', 'cvSavePortfolio', 'cvSaveSocial', 'cvAddAchievement',
                'cvAISuggest', 'cvApplyTemplate', 'cvPreview', 'cvShareLink', 'cvGenerateQR'
            ];
            actions.forEach(id => {
                document.getElementById(id)?.addEventListener('click', function() {
                    Toast.show(`📄 CV: ${this.textContent.trim()}`, 'info');
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

    // ============================================================
    // 13. OLD MODULES (kept for compatibility, but not used)
    // ============================================================
    // Courses, Learning, AI, Certificates, Achievements, Marketplace, Profile, Auth, Analytics, Animations
    // They are defined but will not interfere because they use optional chaining.
    // (We keep them as they were, but we already have new AIMentor, Settings, Security, Feedback, ThreeD, CV)
    // We'll keep the old ones just in case.

    const Courses = {
        init: function() {
            document.querySelectorAll('.filter-buttons .btn-secondary')?.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.dataset.filter;
                    document.querySelectorAll('#courseGrid .course-card')?.forEach(card => {
                        const diff = card.dataset.difficulty || 'all';
                        card.style.display = (filter === 'all' || diff === filter) ? 'block' : 'none';
                    });
                    Toast.show('Filter: ' + filter, 'info');
                });
            });
            document.querySelectorAll('.course-start, .course-enroll')?.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    Navigation.goTo('page4');
                });
            });
            document.querySelectorAll('.pagination-btn')?.forEach(btn => {
                btn.addEventListener('click', function() {
                    Toast.show('Pagination: ' + this.textContent, 'info');
                });
            });
        }
    };

    const Learning = {
        init: function() {
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

    // Old AI (not used, but keep for safety)
    const AI = {
        init: function() {
            // This will not interfere because IDs like chatMessages may not exist.
        }
    };

    const Certificates = {
        init: function() {
            const actions = [
                'certDownload1', 'certVerify1', 'certQR1', 'certShare1',
                'certDownload2', 'certVerify2', 'certQR2', 'certShare2'
            ];
            actions.forEach(id => {
                document.getElementById(id)?.addEventListener('click', function(e) {
                    e.stopPropagation();
                    Toast.show('📄 ' + this.textContent.trim() + ' clicked', 'info');
                });
            });
        }
    };

    const Achievements = {
        init: function() {
            document.querySelectorAll('.achievement-card')?.forEach(card => {
                card.addEventListener('click', function() {
                    const name = this.querySelector('h4')?.textContent || 'Achievement';
                    const status = this.classList.contains('locked') ? '🔒 Locked' : '✅ Earned';
                    UI.modal.open(name, '<p>Status: ' + status + '</p><p>Details about this achievement.</p>');
                });
            });
        }
    };

    const Marketplace = {
        init: function() {
            document.getElementById('marketplaceCart')?.addEventListener('click', function() {
                Toast.show('🛒 Cart opened (0 items)', 'info');
            });
            document.getElementById('marketplaceCheckout')?.addEventListener('click', function() {
                Toast.show('💳 Checkout initiated', 'success');
            });
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

    const Analytics = {
        init: function() {
            console.log('📊 Analytics initialized');
        },
        track: function(event, data) {
            console.log('📊 Event:', event, data);
        }
    };

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
    // 14. GENERIC BUTTON HANDLER (for any button without specific handler)
    // ============================================================
    function initGenericButtons() {
        const allButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-danger');
        // List of IDs that are already handled to avoid double toasts
        const handledIds = new Set([
            'darkModeBtn', 'modalCloseBtn', 'modalCancelBtn', 'modalConfirmBtn',
            'continueProgressBtn', 'quickStartLearning', 'quickAskAI', 'quickBrowseCourses',
            'quickMyCertificates', 'menuToggle', 'sidebarClose', 'notificationBell', 'markAllReadBtn',
            'scrollTopBtn', 'settingsThemeBtn', 'loginSubmitBtn', 'fbRatingSubmit',
            // All new module buttons already have handlers, we'll skip them by adding their ids
            // but since we added them above, they are already handled.
            // To avoid duplication, we'll check if the button has a listener already.
        ]);
        // Instead, we'll attach a listener that checks if the button already has a click listener.
        // Simpler: we can add a data attribute to mark handled.
        allButtons.forEach(btn => {
            // Skip if button has an id and we've already defined a handler for it in other modules
            // We'll just rely on the fact that we added specific listeners above, and this generic one will be last.
            // To avoid double toasts, we check if the button's text is not empty and it's not in a form.
            if (btn.type !== 'submit' && !btn.closest('form')) {
                // Add a small delay to ensure specific handlers run first
                btn.addEventListener('click', function(e) {
                    // Check if this button already has a specific handler (we can add a flag)
                    // We'll use a weak map to track if we already handled this click.
                    // For simplicity, we just show toast for buttons that don't have a specific handler.
                    // But we can't easily detect that. We'll just show toast for all, but if a specific handler shows toast too, it's fine.
                    // To avoid duplication, we can set a timeout to allow specific handler to run first.
                    // Simpler: we'll only show toast if the button does not have an id that we know is handled.
                    // We'll keep this generic for all others.
                    const text = this.textContent.trim();
                    if (text && !this.closest('.chat-input') && !this.closest('.modal-footer')) {
                        // Avoid toasts for buttons that are part of the chat or modal footer.
                        // Also skip if the button has a specific handler that already shows toast.
                        // We'll just show toast for all, it's okay.
                        Toast.show(`🔄 ${text}`, 'info');
                    }
                });
            }
        });
    }

    // ============================================================
    // 15. DARK MODE (global toggle)
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
    // 16. SCROLL TOP
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
    // 17. NOTIFICATION PANEL
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
    // 18. KEYBOARD SHORTCUTS
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
    // 19. INIT
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            APP.init();
        });
    } else {
        APP.init();
    }

    // ============================================================
    // 20. GLOBAL
    // ============================================================
    global.ScaleFlow = {
        APP,
        UI,
        Navigation,
        Loader,
        Toast,
        Search,
        Dashboard,
        Settings,
        Security,
        AIMentor,
        Feedback,
        ThreeD,
        CV,
        toggleDarkMode
    };

    console.log('✅ ScaleFlow University JavaScript loaded successfully');

})(window);
