/*=========================================
ScaleFlow University
HELPERS ENGINE
Version : 1.0.0
Status  : Enterprise Foundation
=========================================*/

"use strict";

/*=========================================
Global Helper Object
=========================================*/
const SF = Object.freeze({});

/*=========================================
Console Logger
=========================================*/
SF.log = function (message, data = null) {
    console.log("[ScaleFlow]", message, data ?? "");
};

/*=========================================
Error Logger
=========================================*/
SF.error = function (message, error = null) {
    console.error("[ScaleFlow ERROR]", message, error ?? "");
};

/*=========================================
Query Selector
=========================================*/
SF.$ = function (selector) {
    return document.querySelector(selector);
};

SF.$$ = function (selector) {
    return document.querySelectorAll(selector);
};

/*=========================================
Element Exists
=========================================*/
SF.exists = function (selector) {
    return document.querySelector(selector) !== null;
};

/*=========================================
Generate Random ID
=========================================*/
SF.generateId = function (prefix = "ID") {
    return prefix + "_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
};

/*=========================================
Current Date
=========================================*/
SF.today = function () {
    return new Date().toISOString().split("T")[0];
};

/*=========================================
Current Date Time
=========================================*/
SF.now = function () {
    return new Date().toLocaleString();
};

/*=========================================
Escape HTML
=========================================*/
SF.escapeHTML = function (text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
};

/*=========================================
Toast Placeholder
=========================================*/
SF.toast = function (message) {
    alert(message);
};

/*=========================================
Success
=========================================*/
SF.success = function (message) {
    SF.toast("✅ " + message);
};

/*=========================================
Warning
=========================================*/
SF.warning = function (message) {
    SF.toast("⚠️ " + message);
};

/*=========================================
Error
=========================================*/
SF.failed = function (message) {
    SF.toast("❌ " + message);
};

/*=========================================
Initialization
=========================================*/
document.addEventListener("DOMContentLoaded", () => {
    SF.log("Helpers Engine Loaded Successfully");
});
