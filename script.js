// ===============================
// SWITCH SECTIONS (smooth + active)
// ===============================
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

// ===============================
// SHOW MESSAGE (clean UX)
// ===============================
function showMessage(elementId, message, color) {
  const el = document.getElementById(elementId);
  el.innerText = message;
  el.style.color = color;

  setTimeout(() => {
    el.innerText = "";
  }, 3000);
}

// ===============================
// SIGNUP (multi-user support)
// ===============================
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

  let users = JSON.parse(localStorage.getItem("r47_users")) || [];

  // check if user exists
  const exists = users.find(u => u.username === user);
  if (exists) {
    showMessage("signupMsg", "⚠ Username already exists", "orange");
    return;
  }

  users.push({ username: user, password: pass });

  localStorage.setItem("r47_users", JSON.stringify(users));

  showMessage("signupMsg", "✅ Account created!", "lightgreen");

  setTimeout(() => showSection("login"), 1500);
}

// ===============================
// LOGIN (multi-user + session)
// ===============================
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  const users = JSON.parse(localStorage.getItem("r47_users")) || [];

  const validUser = users.find(
    u => u.username === user && u.password === pass
  );

  if (validUser) {
    showMessage("loginMsg", "🔥 Login successful!", "lightgreen");

    localStorage.setItem("r47_logged_in", "true");
    localStorage.setItem("r47_current_user", user);

    setTimeout(() => showSection("home"), 1000);

  } else {
    showMessage("loginMsg", "❌ Invalid credentials", "red");
  }
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("r47_logged_in");
  localStorage.removeItem("r47_current_user");

  showSection("login");
}

// ===============================
// ENTER KEY SUPPORT (PRO UX)
// ===============================
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const loginVisible = document
      .getElementById("login")
      .classList.contains("active");

    const signupVisible = document
      .getElementById("signup")
      .classList.contains("active");

    if (loginVisible) login();
    if (signupVisible) signup();
  }
});

// ===============================
// AUTO LOGIN CHECK
// ===============================
window.onload = () => {
  if (localStorage.getItem("r47_logged_in") === "true") {
    showSection("home");
  }
};