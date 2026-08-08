// SWITCH SECTIONS (smooth + active control)
function showSection(id) {
  const sections = document.querySelectorAll(".card");

  sections.forEach(sec => {
    sec.classList.remove("active");
    sec.classList.add("hidden");
  });

  const active = document.getElementById(id);
  active.classList.remove("hidden");
  active.classList.add("active");
}

// SHOW MESSAGE (clean UX)
function showMessage(elementId, message, color) {
  const el = document.getElementById(elementId);
  el.innerText = message;
  el.style.color = color;

  setTimeout(() => {
    el.innerText = "";
  }, 3000);
}

// SIGNUP (better validation)
function signup() {
  const user = document.getElementById("signupUser").value.trim();
  const pass = document.getElementById("signupPass").value.trim();

  if (user.length < 3) {
    showMessage("signupMsg", "⚠ Username must be 3+ chars", "orange");
    return;
  }

  if (pass.length < 4) {
    showMessage("signupMsg", "⚠ Password too short", "orange");
    return;
  }

  // Save as object (better structure)
  const userData = {
    username: user,
    password: pass
  };

  localStorage.setItem("r47_user", JSON.stringify(userData));

  showMessage("signupMsg", "✅ Account created!", "lightgreen");

  // Auto switch to login
  setTimeout(() => showSection("login"), 1500);
}

// LOGIN (improved logic)
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  const savedData = JSON.parse(localStorage.getItem("r47_user"));

  if (!savedData) {
    showMessage("loginMsg", "⚠ No account found. Sign up first!", "orange");
    return;
  }

  if (user === savedData.username && pass === savedData.password) {
    showMessage("loginMsg", "🔥 Login successful!", "lightgreen");

    // Save session
    localStorage.setItem("r47_logged_in", "true");

    // Example redirect (you can create dashboard.html)
    setTimeout(() => {
      showSection("home");
    }, 1000);

  } else {
    showMessage("loginMsg", "❌ Wrong username or password", "red");
  }
}

// AUTO LOGIN CHECK
window.onload = () => {
  if (localStorage.getItem("r47_logged_in") === "true") {
    showSection("home");
  }
};
