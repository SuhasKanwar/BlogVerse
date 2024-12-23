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
      document.getElementById(`${sectionToShow}-section`).classList.add("active");
    });
  });

  const shareDialog = document.querySelector("#share-dialog-box");
  const shareButton = document.querySelector(".share-button");
  const copyButton = document.querySelector(".copy-button");
  
  function showShareDialog() {
    shareDialog.showModal();
  }
  shareButton?.addEventListener("click", showShareDialog);

  function copyText() {
    const copyInput = document.querySelector("#copy-link-input");
    
    navigator.clipboard.writeText(copyInput.value).then(() => {
      const originalText = copyButton.textContent;
      copyButton.classList.add('copied');
      copyButton.textContent = 'Copied!';
      
      setTimeout(() => {
        copyButton.classList.remove('copied');
        copyButton.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      copyInput.select();
      copyInput.setSelectionRange(0, 99999);
      document.execCommand('copy');
      copyButton.textContent = 'Copied!';
    });
  }
  copyButton?.addEventListener("click", copyText);

  const changePasswordDialog = document.querySelector("#change-password-dialog-box");
  const changePasswordButton = document.querySelector("#change-password-button");
  const changePasswordForm = document.querySelector("#change-password-form");

  function showChangePasswordDialog() {
    changePasswordDialog.showModal();
  }
  changePasswordButton?.addEventListener("click", showChangePasswordDialog);

  document.querySelectorAll(".close-button").forEach(button => {
    button.addEventListener("click", () => {
      const dialog = button.closest('dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });

  document.querySelector(".cancel-button")?.addEventListener("click", () => {
    changePasswordDialog.close();
  });

  changePasswordForm?.addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href = "/otp";
  });

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (event) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
  });

  document.querySelectorAll('dialog > *').forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('dialog[open]').forEach(dialog => {
        dialog.close();
      });
    }
  });
});