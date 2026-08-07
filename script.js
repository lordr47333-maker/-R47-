function showSection(id) {
  let sections = document.querySelectorAll(".card");
  sections.forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function signup() {
  let user = document.getElementById("signupUser").value;
  let pass = document.getElementById("signupPass").value;

  if (!user || !pass) {
    document.getElementById("signupMsg").innerText = "Fill all fields!";
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  document.getElementById("signupMsg").innerText = "Account created ✅";
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let savedUser = localStorage.getItem("user");
  let savedPass = localStorage.getItem("pass");

  if (user === savedUser && pass === savedPass) {
    document.getElementById("loginMsg").innerText = "Welcome back 🔥";
  } else {
    document.getElementById("loginMsg").innerText = "Invalid login ❌";
  }
}
