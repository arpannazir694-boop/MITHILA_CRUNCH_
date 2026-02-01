/* =========================================
   MITHILA CRUNCH - FINAL MAIN.JS
   FormData based (NO CORS ISSUE)
========================================= */

const API_URL =
  "https://script.google.com/macros/s/AKfycbw2prFyE0NrF_eiWEkjVukUMZwr4M5mmuXBIl22Gd-JfyZnqOc-uiYzPfNrLwriWNaT/exec";


document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");
  const forgotForm = document.getElementById("forgotForm");
  const tabs = document.querySelectorAll(".tabs button");

  /* ================= TAB FUNCTIONS ================= */
  window.resetTabs = function () {
    tabs.forEach(btn => btn.classList.remove("active"));
  };

  window.showSignIn = function () {
    resetTabs();
    tabs[0].classList.add("active");
    signInForm.classList.remove("hidden");
    signUpForm.classList.add("hidden");
    forgotForm.classList.add("hidden");
  };

  window.showSignUp = function () {
    resetTabs();
    tabs[1].classList.add("active");
    signUpForm.classList.remove("hidden");
    signInForm.classList.add("hidden");
    forgotForm.classList.add("hidden");
  };

  window.showForgot = function () {
    resetTabs();
    signInForm.classList.add("hidden");
    signUpForm.classList.add("hidden");
    forgotForm.classList.remove("hidden");
  };

  /* ================= SIGN IN ================= */
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    const formData = new FormData();
    formData.append("action", "login");
    formData.append("email", email);
    formData.append("password", password);

    fetch(API_URL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        const data = JSON.parse(text);
        console.log("LOGIN RESPONSE:", data);

        if (data.status === "success") {
          localStorage.setItem("mithilaUser", JSON.stringify(data));
          window.location.href = "home.html";
        } else {
          alert(data.message || "Invalid login");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Server connection failed");
      });
  });

  /* ================= SIGN UP ================= */
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = this.fullname.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    if (!fullname || !email || !password) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("action", "signup");
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);

    fetch(API_URL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        const data = JSON.parse(text);
        alert(data.message);

        if (data.status === "success") {
          signUpForm.reset();
          showSignIn();
        }
      })
      .catch(err => {
        console.error(err);
        alert("Server connection failed");
      });
  });

  /* ================= SEND OTP ================= */
  window.sendOtp = function () {
    const email = document.getElementById("forgotEmail").value.trim();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    const formData = new FormData();
    formData.append("action", "sendOtp");
    formData.append("email", email);

    fetch(API_URL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        const data = JSON.parse(text);
        alert(data.message);

        if (data.status === "success") {
          document.getElementById("otpSection").classList.remove("hidden");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Server connection failed");
      });
  };

  /* ================= RESET PASSWORD ================= */
  window.resetPassword = function () {
    const email = document.getElementById("forgotEmail").value.trim();
    const otp = document.getElementById("otp").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (!otp || !newPassword) {
      alert("OTP and new password required");
      return;
    }

    const formData = new FormData();
    formData.append("action", "resetPassword");
    formData.append("email", email);
    formData.append("otp", otp);
    formData.append("newPassword", newPassword);

    fetch(API_URL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        const data = JSON.parse(text);
        alert(data.message);

        if (data.status === "success") {
          document.getElementById("otpSection").classList.add("hidden");
          showSignIn();
        }
      })
      .catch(err => {
        console.error(err);
        alert("Server connection failed");
      });
  };

  /* ================= AUTO REDIRECT IF LOGGED IN ================= */
  if (localStorage.getItem("mithilaUser")) {
    if (window.location.pathname.includes("index.html")) {
      window.location.href = "home.html";
    }
  }

});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // side menu open থাকলে close করে দাও
    document.body.classList.remove("menu-open");
  });
});
const sideMenu = document.getElementById("sideMenu");

document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.startsWith("#")) {
      e.preventDefault();

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      /* 🔥 AUTO HIDE SIDE MENU */
      document.body.classList.remove("menu-open");
    }
  });
});
function toggleMenu() {
  document.body.classList.toggle("menu-open");
}
/* ================= LOGOUT ================= */
function logout() {
  // clear login session
  localStorage.removeItem("mithilaUser");

  // go to sign in / sign up page
  window.location.href = "index.html";
}
