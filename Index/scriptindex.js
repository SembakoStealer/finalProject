// Select all carousels on the page
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const nextButton = carousel.querySelector('.next');
    const prevButton = carousel.querySelector('.prev');

    // Constants
    const TRANSITION_DURATION = 500; // Duration in milliseconds
    const SLIDE_GAP = 30; // Gap between slides

    // Prevent multiple initializations
    if (carousel.dataset.initialized) return;
    carousel.dataset.initialized = 'true';

    // Prepare slides for infinite loop
    let slides = Array.from(track.children);
    
    // Add necessary classes for styling
    track.classList.add('carousel-track-infinite');
    slides.forEach(slide => slide.classList.add('carousel-slide'));

    // Clone first and last slides for infinite loop
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    
    // Mark clones to prevent duplicate interactions
    firstClone.classList.add('clone', 'clone-first');
    lastClone.classList.add('clone', 'clone-last');
    
    track.appendChild(firstClone);
    track.prepend(lastClone);

    // Update the slides array after appending the clones
    slides = Array.from(track.children);
    const totalSlides = slides.length;
    let currentIndex = 1; // Start at the first real slide (after the clone)
    let isTransitioning = false;

    // Function to move to a particular slide index
    function moveToSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        const slideWidth = slides[0].getBoundingClientRect().width;
        const translateX = -(index * (slideWidth + SLIDE_GAP));
        
        track.style.transition = `transform ${TRANSITION_DURATION}ms ease`;
        track.style.transform = `translateX(${translateX}px)`;
    }

    // Handle transition end to reset position and allow new transitions
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        // Reset position for infinite loop
        if (currentIndex === 0) {
            track.style.transition = 'none';
            currentIndex = totalSlides - 2;
            moveToSlide(currentIndex);
        } else if (currentIndex === totalSlides - 1) {
            track.style.transition = 'none';
            currentIndex = 1;
            moveToSlide(currentIndex);
        }
    });

    // Initialize the carousel at the correct starting position
    moveToSlide(currentIndex);

    // Handle the Next button click
    nextButton.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex++;
        moveToSlide(currentIndex);
    });

    // Handle the Previous button click
    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex--;
        moveToSlide(currentIndex);
    });

    // Optional: Add keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextButton.click();
        } else if (e.key === 'ArrowLeft') {
            prevButton.click();
        }
    });

    // Optional: Pause on hover for accessibility
    carousel.addEventListener('mouseenter', () => {
        carousel.setAttribute('aria-live', 'polite');
    });

    carousel.addEventListener('mouseleave', () => {
        carousel.removeAttribute('aria-live');
    });
});