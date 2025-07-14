document.addEventListener("DOMContentLoaded", function () {
    gsap.fromTo(
        ".loading-page",
        { opacity: 1 },
        {
            opacity: 0,
            duration: 1.5,
            delay: 3.5,
            onComplete: function () {
                // Hide the loading page after animation
                gsap.set(".loading-page", { display: "none" });
            },
        }
    );

    gsap.fromTo(
        ".logo-name",
        {
            y: 50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: 0.5,
        }
    );
});
