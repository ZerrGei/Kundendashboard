document.addEventListener("DOMContentLoaded", function () {
  // Login für das Admin-Panel
  const adminLogin = sessionStorage.getItem("adminLoggedIn");
  if (!adminLogin) {
    let user = prompt("Admin-Benutzername:");
    let pass = prompt("Admin-Passwort:");

    if (user !== "MM" || pass !== "MMAdmin28279") {
      alert("Falsche Admin-Zugangsdaten!");
      window.location.href = "index.html";
    } else {
      sessionStorage.setItem("adminLoggedIn", "true");
    }
  }

  // Kundenkonto speichern
  document.getElementById("adminForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.getElementById("custUsername").value;
    let password = document.getElementById("custPassword").value;
    let name = document.getElementById("custName").value;
    let phone = document.getElementById("custPhone").value;
    let email = document.getElementById("custEmail").value;
    let contact = document.getElementById("custContact").value;
    let image = document.getElementById("custImage").value;

    let userData = {
      username,
      password,
      name,
      phone,
      email,
      contact,
      image,
    };

    localStorage.setItem(username, JSON.stringify(userData));
    alert("Benutzer gespeichert!");
  });

  // Vertragsgeräte speichern
  document.getElementById("deviceForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.getElementById("deviceUsername").value;
    let device = document.getElementById("deviceName").value;
    let count = document.getElementById("deviceCount").value;
    let cost = document.getElementById("deviceCost").value;

    let devices = JSON.parse(localStorage.getItem(username + "_devices")) || [];
    devices.push({ device, count, cost });

    localStorage.setItem(username + "_devices", JSON.stringify(devices));
    alert("Gerät gespeichert!");
  });

  // Neue Admin-Konten hinzufügen
  document.getElementById("adminAccessForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let newUser = document.getElementById("newAdminUsername").value;
    let newPass = document.getElementById("newAdminPassword").value;

    let adminList = JSON.parse(localStorage.getItem("adminAccounts")) || [];
    adminList.push({ username: newUser, password: newPass });

    localStorage.setItem("adminAccounts", JSON.stringify(adminList));
    alert("Neuer Admin angelegt!");
  });
});
