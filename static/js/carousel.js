document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const items = document.querySelectorAll(".carousel-item");
    const visibleItems = 5; // Number of posters visible at a time
    const totalItems = items.length;
    
    let index = 0;
    let interval;

    // Duplicate posters at the start and end for seamless looping
    for (let i = 0; i < visibleItems; i++) {
      let cloneFirst = items[i].cloneNode(true);
      let cloneLast = items[totalItems - 1 - i].cloneNode(true);
      track.appendChild(cloneFirst);
      track.insertBefore(cloneLast, track.firstChild);
    }

    // Adjust starting position
    const itemWidth = 100 / visibleItems;
    track.style.transform = `translateX(-${itemWidth * visibleItems}%)`;

    function updateCarousel() {
      track.style.transition = "transform 0.7s ease-in-out";
      track.style.transform = `translateX(-${(index + visibleItems) * itemWidth}%)`;
    }

    function nextSlide() {
      index++;
      updateCarousel();
      if (index >= totalItems) {
        setTimeout(() => {
          track.style.transition = "none"; // Disable transition for reset
          index = 0;
          track.style.transform = `translateX(-${(index + visibleItems) * itemWidth}%)`; // Instantly reset to start
          setTimeout(() => {
            track.style.transition = "transform 0.7s ease-in-out"; // Re-enable transition
          }, 50); // Small delay to allow the reset to happen
        }, 700); // Reset position instantly after animation
      }
    }

    function prevSlide() {
      index--;
      updateCarousel();
      if (index < 0) {
        setTimeout(() => {
          track.style.transition = "none"; // Disable transition for reset
          index = totalItems - 1;
          track.style.transform = `translateX(-${(index + visibleItems) * itemWidth}%)`; // Instantly reset to last item
          setTimeout(() => {
            track.style.transition = "transform 0.7s ease-in-out"; // Re-enable transition
          }, 50); // Small delay to allow the reset to happen
        }, 700); // Reset position instantly after animation
      }
    }

    document.getElementById("nextBtn").addEventListener("click", nextSlide);
    document.getElementById("prevBtn").addEventListener("click", prevSlide);

    // Auto-slide every 3 seconds
    function startAutoSlide() {
      interval = setInterval(nextSlide, 2500);
    }

    function stopAutoSlide() {
      clearInterval(interval);
    }

    startAutoSlide();

    document.getElementById("movieCarousel").addEventListener("mouseenter", stopAutoSlide);
    document.getElementById("movieCarousel").addEventListener("mouseleave", startAutoSlide);
});
