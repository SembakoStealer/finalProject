const mainContainer = document.querySelector(".main-container"),
    imagePreview = document.querySelectorAll(".image-preview"),
    image = document.querySelectorAll(".image-preview img"),
    video = document.querySelectorAll("video");

window.onload = () => {
    const setOpacity = (opacity) => image.forEach(img => img.style.opacity = opacity);
    mainContainer.onmouseenter = () => setOpacity(0.2);
    mainContainer.onmouseleave = () => setOpacity(1);

    gsap.fromTo(imagePreview,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 },
        { duration: 1.5, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, stagger: 0.2, ease: "power2.out" }
    );

    imagePreview.forEach((preview, index) => {
        const expandCard = (flexValue) => gsap.to(preview, { duration: 0.3, flex: flexValue, ease: "power2.inOut" });
        let isHovered = false;

        preview.onmouseenter = () => {
            if (!isHovered) {
                isHovered = true;
                expandCard(2);
                if (video[index].readyState >= 3) {
                    video[index].play();
                }
            }
        };
        preview.onmouseleave = () => {
            if (isHovered) {
                isHovered = false;
                expandCard(1);
                video[index].pause();
            }
        };
    });
};

function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdown-content");
    const dropdownArrow = document.getElementById("dropdown-arrow");
  
    if (dropdownContent.style.maxHeight) {
      dropdownContent.style.maxHeight = null;
      dropdownArrow.style.transform = "rotate(0deg)";
    } else {
      dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
      dropdownArrow.style.transform = "rotate(180deg)";
    }
  }
  