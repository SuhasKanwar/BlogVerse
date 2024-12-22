document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".profile-tab");

  const sections = document.querySelectorAll(".section-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));

      this.classList.add("active");

      const sectionToShow = this.getAttribute("data-section");

      sections.forEach((section) => {
        section.classList.remove("active");
      });

      document
        .getElementById(`${sectionToShow}-section`)
        .classList.add("active");
    });
  });

  const changePasswordButton = document.getElementById("change-password-button");
  const modal = document.getElementById("confirmation-modal");
  const closeButton = document.querySelector(".close-button");
  const confirmButton = document.getElementById("confirm-button");
  const cancelButton = document.getElementById("cancel-button");

  changePasswordButton.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  cancelButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  confirmButton.addEventListener("click", function () {
    window.location.href = "/otp";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});