document.addEventListener("DOMContentLoaded", function () {
  const navbarCollapse = document.getElementById("navbarSupportedContent");
  const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

  // Close when clicking any link or button inside dropdown
  navbarCollapse.querySelectorAll("a, button, input").forEach(function (el) {
    el.addEventListener("click", function () {
      bsCollapse.hide();
    });
  });

  // Close when clicking outside the navbar
  document.addEventListener("click", function (e) {
    if (!document.querySelector(".navbar").contains(e.target)) {
      bsCollapse.hide();
    }
  });
});