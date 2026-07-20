/*============================================================
Sanaullah ScaleFlow University
Home.js
Part 1A
Core Initialization
Version : 1.0
============================================================*/

(function () {

"use strict";

/*============================================================
APP INFORMATION
============================================================*/

const APP_NAME = "Sanaullah ScaleFlow University";
const APP_VERSION = "1.0";


/*============================================================
GLOBAL ELEMENTS
============================================================*/

const loader =
document.getElementById("loader");

const toastContainer =
document.getElementById("toast-container");

const modal =
document.getElementById("modal-container");


/*============================================================
APPLICATION START
============================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log(APP_NAME);
    console.log("Home.js Part 1A Loaded");

    hideLoader();

});


/*============================================================
HIDE LOADER
============================================================*/

function hideLoader() {

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },300);

    },800);

}


/*============================================================
SHOW TOAST
============================================================*/

function showToast(message) {

    if (!toastContainer) return;

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    },3000);

}


/*============================================================
GLOBAL EXPORT
============================================================*/

window.HomeApp = {

    showToast,
    hideLoader

};

})();

/*============================================================
Sanaullah ScaleFlow University
Home.js
Part 1B
Dark Mode + Notification + Sidebar
Version : 1.0
============================================================*/

(function () {

"use strict";

/*============================================================
ELEMENTS
============================================================*/

const darkModeBtn =
document.getElementById("darkModeBtn");

const notificationBell =
document.getElementById("notificationBell");

const notificationPanel =
document.getElementById("notificationPanel");

const notificationCount =
document.getElementById("notificationCount");

const markAllReadBtn =
document.getElementById("markAllReadBtn");

const sidebar =
document.getElementById("sidebar");

const sidebarMenu =
document.getElementById("sidebarMenu");


/*============================================================
LOAD SAVED THEME
============================================================*/

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

    if(darkModeBtn){

        darkModeBtn.textContent = "☀️";

    }

}


/*============================================================
DARK MODE
============================================================*/

darkModeBtn?.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    const isDark =
    document.body.classList.contains("dark-mode");

    darkModeBtn.textContent =
    isDark ? "☀️" : "🌙";

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    if(window.HomeApp){

        window.HomeApp.showToast(
            isDark ?
            "Dark Mode Enabled" :
            "Light Mode Enabled"
        );

    }

});


/*============================================================
NOTIFICATION PANEL
============================================================*/

notificationBell?.addEventListener("click",()=>{

    notificationPanel.classList.toggle("open");

});


/*============================================================
MARK ALL READ
============================================================*/

markAllReadBtn?.addEventListener("click",()=>{

    notificationCount.textContent="0";

    document
    .querySelectorAll(".notification-item")
    .forEach(item=>{

        item.classList.remove("unread");

    });

    if(window.HomeApp){

        window.HomeApp.showToast(
            "All notifications marked as read"
        );

    }

});


/*============================================================
SIDEBAR ACTIVE MENU
============================================================*/

sidebarMenu?.querySelectorAll("a")
.forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        sidebarMenu
        .querySelectorAll("a")
        .forEach(item=>{

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


/*============================================================
PART LOADED
============================================================*/

console.log(
"Home.js Part 1B Loaded"
);

})();

/*==========================================================
Sanaullah ScaleFlow University
Home.js
Part 1C
Quick Actions
Version 1.0
==========================================================*/

(function () {

"use strict";

const actions = {

    quickStartLearning() {
        alert("📖 Opening Learning Center...");
    },

    quickBrowseCourses() {
        alert("📚 Opening Courses...");
    },

    quickCertificates() {
        alert("📜 Opening Certificates...");
    },

    quickAchievements() {
        alert("🏆 Opening Achievements...");
    },

    quickAI() {
        alert("🤖 Opening AI Mentor...");
    },

    quickMarketplace() {
        alert("🛒 Opening Marketplace...");
    },

    quickBusiness() {
        alert("💼 Opening Business Hub...");
    },

    quickProfile() {
        alert("👤 Opening Profile...");
    }

};

// =====================================================
// Register Buttons
// =====================================================

Object.keys(actions).forEach(function(id){

    const btn = document.getElementById(id);

    if(btn){

        btn.addEventListener("click", actions[id]);

    }

});

// =====================================================
// Hover Animation
// =====================================================

document.querySelectorAll(".tool-card").forEach(function(card){

    card.addEventListener("mouseenter", function(){

        this.style.transform = "translateY(-6px)";

    });

    card.addEventListener("mouseleave", function(){

        this.style.transform = "";

    });

});

console.log("✅ Home.js Part 1C Loaded");

})();

/*============================================================
Sanaullah ScaleFlow University
Home.js
Part 1D
Continue Learning + Progress
Version : 1.0
============================================================*/

(function () {

"use strict";

/*============================================================
ELEMENTS
============================================================*/

const resumeCourseBtn =
document.getElementById("resumeCourseBtn");

const continueLearningBtn =
document.getElementById("continueLearningBtn");

const browseCoursesBtn =
document.getElementById("browseCoursesBtn");

const progressBar =
document.getElementById("courseProgressBar");

const progressText =
document.getElementById("courseProgressText");


/*============================================================
COURSE PROGRESS
============================================================*/

let currentProgress = 75;

function updateProgress(value){

    currentProgress = value;

    if(progressBar){

        progressBar.style.width = value + "%";

    }

    if(progressText){

        progressText.textContent = value + "%";

    }

}


/*============================================================
RESUME COURSE
============================================================*/

resumeCourseBtn?.addEventListener("click",function(){

    if(window.HomeApp){

        window.HomeApp.showToast(
            "📖 Resuming your last lesson..."
        );

    }

});


/*============================================================
CONTINUE LEARNING
============================================================*/

continueLearningBtn?.addEventListener("click",function(){

    if(window.HomeApp){

        window.HomeApp.showToast(
            "🚀 Opening Learning Center..."
        );

    }

});


/*============================================================
BROWSE COURSES
============================================================*/

browseCoursesBtn?.addEventListener("click",function(){

    if(window.HomeApp){

        window.HomeApp.showToast(
            "📚 Opening Courses..."
        );

    }

});


/*============================================================
DEMO PROGRESS UPDATE
============================================================*/

setTimeout(function(){

    updateProgress(currentProgress);

},300);


/*============================================================
EXPORT
============================================================*/

window.HomeProgress = {

    updateProgress

};


console.log("✅ Home.js Part 1D Loaded");

})();

/* ==========================================================
   Sanaullah ScaleFlow University
   Home.js — Part 1E
   Today's Tasks + Progress
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const taskBoxes = document.querySelectorAll(".task-item input[type='checkbox']");
    const progressBar = document.getElementById("courseProgressBar");
    const progressText = document.getElementById("courseProgressText");

    if (!taskBoxes.length) return;

    function updateTaskProgress() {

        const total = taskBoxes.length;
        let completed = 0;

        taskBoxes.forEach(task => {
            if (task.checked) completed++;
        });

        const percent = Math.round((completed / total) * 100);

        if (progressBar) {
            progressBar.style.width = percent + "%";
        }

        if (progressText) {
            progressText.textContent = percent + "%";
        }

        localStorage.setItem(
            "sf_home_tasks",
            JSON.stringify(
                [...taskBoxes].map(task => task.checked)
            )
        );

    }

    // Restore Saved Tasks

    const saved = localStorage.getItem("sf_home_tasks");

    if (saved) {

        try {

            const values = JSON.parse(saved);

            taskBoxes.forEach((task, index) => {

                if (values[index] !== undefined) {

                    task.checked = values[index];

                }

            });

        } catch (e) {

            console.log("Task restore skipped");

        }

    }

    taskBoxes.forEach(task => {

        task.addEventListener("change", updateTaskProgress);

    });

    updateTaskProgress();

});

/*============================================================
Sanaullah ScaleFlow University
Home.js
Part 1F
Weekly Progress + Activity + AI Recommendation
Version : 1.0
============================================================*/

(function () {

"use strict";

/*============================================================
ELEMENTS
============================================================*/

const weeklyBars =
document.querySelectorAll(".progress-chart .bar");

const activityItems =
document.querySelectorAll(".activity-item");

const achievementCard =
document.querySelector(".achievement-card");

const aiRecommendationBtn =
document.getElementById("aiRecommendationBtn");


/*============================================================
ANIMATE WEEKLY PROGRESS
============================================================*/

function animateWeeklyProgress(){

    weeklyBars.forEach(function(bar){

        const targetHeight = bar.style.height;

        bar.style.height = "0%";

        setTimeout(function(){

            bar.style.height = targetHeight;

        },300);

    });

}


/*============================================================
RECENT ACTIVITY EFFECT
============================================================*/

activityItems.forEach(function(item,index){

    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    setTimeout(function(){

        item.style.transition = "0.5s";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";

    },index*150);

});


/*============================================================
LATEST ACHIEVEMENT
============================================================*/

achievementCard?.addEventListener("click",function(){

    if(window.HomeApp){

        window.HomeApp.showToast(
            "🏆 Fast Learner Achievement"
        );

    }

});


/*============================================================
AI RECOMMENDATION
============================================================*/

aiRecommendationBtn?.addEventListener("click",function(){

    if(window.HomeApp){

        window.HomeApp.showToast(
            "🤖 Opening AI Recommendation..."
        );

    }

});


/*============================================================
START
============================================================*/

document.addEventListener("DOMContentLoaded",function(){

    animateWeeklyProgress();

});


console.log("✅ Home.js Part 1F Loaded");

})();

/*============================================================
Sanaullah ScaleFlow University
Home.js
Part 1G
Final Boot + System Status + Footer
Version : 1.0
============================================================*/

(function () {

"use strict";

/*============================================================
SYSTEM STATUS CARDS
============================================================*/

document.querySelectorAll(".tool-card").forEach(function(card){

    card.addEventListener("click",function(){

        const title =
        this.querySelector("h3")?.textContent || "Module";

        if(window.HomeApp){

            window.HomeApp.showToast(
                "Opening " + title
            );

        }

    });

});


/*============================================================
START AI RECOMMENDATION
============================================================*/

const startRecommendationBtn =
document.getElementById("startRecommendationBtn");

startRecommendationBtn?.addEventListener("click",function(){

    if(window.HomeApp){

        window.HomeApp.showToast(
            "🤖 AI Recommendation Started"
        );

    }

});


/*============================================================
FOOTER YEAR
============================================================*/

const footer =
document.querySelector(".footer-right");

if(footer){

    footer.innerHTML =
    "© " +
    new Date().getFullYear() +
    " Sanaullah ScaleFlow University";

}


/*============================================================
HOME MODULE READY
============================================================*/

document.addEventListener("DOMContentLoaded",function(){

    console.log("===================================");

    console.log("Sanaullah ScaleFlow University");

    console.log("Home Module Loaded Successfully");

    console.log("Version : 1.0");

    console.log("Status  : READY");

    console.log("===================================");

    if(window.HomeApp){

        window.HomeApp.showToast(
            "🎓 Home Module Ready"
        );

    }

});


/*============================================================
GLOBAL EXPORT
============================================================*/

window.HomeModule = {

    version : "1.0",

    status : "READY",

    author : "Sanaullah"

};

})();
