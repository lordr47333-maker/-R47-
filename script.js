/* =========================
SECTION SWITCH
========================= */
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

/* =========================
MESSAGE SYSTEM
========================= */
function showMessage(elementId, message, color) {
const el = document.getElementById(elementId);
el.innerText = message;
el.style.color = color;

setTimeout(() => {
el.innerText = "";
}, 3000);
}

/* =========================
STORAGE HELPERS
========================= */
function getUsers() {
return JSON.parse(localStorage.getItem("r47_users")) || [];
}

function saveUsers(users) {
localStorage.setItem("r47_users", JSON.stringify(users));
}

/* =========================
SIGNUP (PRO)
========================= */
function signup() {
const user = document.getElementById("signupUser").value.trim();
const pass = document.getElementById("signupPass").value.trim();

if (user.length < 3) {
showMessage("signupMsg", "⚠ Username must be 3+ chars", "orange");
return;
}

if (pass.length < 4) {
showMessage("signupMsg", "⚠ Password must be 4+ chars", "orange");
return;
}

let users = getUsers();

// Check duplicate
const exists = users.find(u => u.username === user);
if (exists) {
showMessage("signupMsg", "❌ Username already exists", "red");
return;
}

// Save new user
users.push({ username: user, password: pass });
saveUsers(users);

showMessage("signupMsg", "✅ Account created!", "lightgreen");

// Clear inputs
document.getElementById("signupUser").value = "";
document.getElementById("signupPass").value = "";

setTimeout(() => showSection("login"), 1200);
}

/* =========================
LOGIN (PRO)
========================= */
function login() {
const user = document.getElementById("loginUser").value.trim();
const pass = document.getElementById("loginPass").value.trim();

const users = getUsers();

const validUser = users.find(
u => u.username === user && u.password === pass
);

if (validUser) {
showMessage("loginMsg", "🔥 Login successful!", "lightgreen");

// Save session
sessionStorage.setItem("r47_logged_user", user);

setTimeout(() => {
  showSection("home");
  updateUIAfterLogin();
}, 800);

} else {
showMessage("loginMsg", "❌ Invalid username or password", "red");
}
}

/* =========================
LOGOUT
========================= */
function logout() {
sessionStorage.removeItem("r47_logged_user");
showSection("login");
}

/* =========================
AUTO LOGIN
========================= */
window.onload = () => {
const user = sessionStorage.getItem("r47_logged_user");

if (user) {
showSection("home");
updateUIAfterLogin();
}
};

/* =========================
ENTER KEY SUPPORT
========================= */
document.addEventListener("keypress", function (e) {
if (e.key === "Enter") {
if (!document.getElementById("login").classList.contains("hidden")) {
login();
}
if (!document.getElementById("signup").classList.contains("hidden")) {
signup();
}
}
});

/* =========================
UI UPDATE AFTER LOGIN
========================= */
function updateUIAfterLogin() {
const user = sessionStorage.getItem("r47_logged_user");

if (user) {
document.querySelector("#home h2").innerText = "Welcome " + user + " 🚀";
}
}