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
  