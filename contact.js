// JavaScript for Form Validation and Interactivity
document
.getElementById("registrationForm")
.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const faculty = document.getElementById("faculty").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const address = document.getElementById("address").value.trim();
  const phoneNumber = document
    .getElementById("phoneNumber")
    .value.trim();

  // Validation
  if (
    !fullName ||
    !studentId ||
    !email ||
    !faculty ||
    !dob ||
    !gender ||
    !address ||
    !phoneNumber
  ) {
    alert("All fields are required.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!/^\d+$/.test(phoneNumber) || phoneNumber.length < 10) {
    alert("Phone Number must be numeric and at least 10 digits.");
    return;
  }

  alert("Registration successful!");
  this.reset();
});

// Clear Button
document
.getElementById("clearButton")
.addEventListener("click", function () {
  document.getElementById("registrationForm").reset();
});