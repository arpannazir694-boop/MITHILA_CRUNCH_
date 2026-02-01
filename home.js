/* =========================================
   MITHILA CRUNCH - HOME.JS
   Login / Logout Controller
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const authBtn = document.getElementById("authBtn");

  // Safety check
  if (!authBtn) return;

  const user = localStorage.getItem("mithilaUser");

  if (user) {
    // USER LOGGED IN
    authBtn.innerText = "Logout";

    authBtn.addEventListener("click", function () {
      localStorage.removeItem("mithilaUser");
      window.location.reload();
    });

  } else {
    // USER NOT LOGGED IN
    authBtn.innerText = "Login";

    authBtn.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
});
