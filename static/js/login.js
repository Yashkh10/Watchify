document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded");

    // Get elements
    const loginForm = document.getElementById("loginForm");
    const overlay = document.getElementById("overlay");
    const loginButton = document.getElementById("loginButton");
    const closeButton = document.getElementById("closeButton");

    if (!loginForm || !overlay || !loginButton || !closeButton) {
        console.error("One or more elements not found! Check IDs in HTML.");
        return;
    }

    // Open login form
    loginButton.addEventListener("click", function () {
        console.log("Login button clicked");
        overlay.style.display = "block";
        loginForm.classList.add("show"); // Add animation class
    });

    // Close login form
    function closeForm() {
        console.log("Closing form");
        loginForm.classList.remove("show"); // Hide animation
        setTimeout(() => {
            overlay.style.display = "none";
        }, 300); // Match CSS transition time
    }

    closeButton.addEventListener("click", closeForm);
    overlay.addEventListener("click", closeForm);
});
