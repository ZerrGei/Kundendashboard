// ==============================
// Benutzerverwaltung
// ==============================
async function loadUsers() {
  let users = localStorage.getItem('users');
  if (users) {
    return JSON.parse(users);
  } else {
    try {
      const response = await fetch('data/users.json');
      if (!response.ok) throw new Error('Fehler beim Laden der Benutzerdaten.');
      users = await response.json();
      localStorage.setItem('users', JSON.stringify(users));
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// ==============================
// Admin-Kontenverwaltung
// ==============================
function loadAdminUsers() {
  let admins = localStorage.getItem('adminUsers');
  if (admins) {
    return JSON.parse(admins);
  } else {
    const defaultAdmins = [
      { username: "MM", password: "MMAdmin28279" }
    ];
    localStorage.setItem('adminUsers', JSON.stringify(defaultAdmins));
    return defaultAdmins;
  }
}

function saveAdminUsers(admins) {
  localStorage.setItem('adminUsers', JSON.stringify(admins));
}

// ==============================
// Login für normale Benutzer (index.html)
// ==============================
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const users = await loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

// ==============================
// Dashboard: Zeige aktuelle Benutzerdaten (dashboard.html)
// ==============================
document.addEventListener('DOMContentLoaded', function() {
  // Warenkorb: Artikel hinzufügen
  const addItemBtn = document.getElementById('addItemBtn');
  if (addItemBtn) {
    addItemBtn.addEventListener('click', function() {
      const cartItems = document.getElementById('cartItems');
      const newItem = document.createElement('div');
      newItem.className = 'cart-item';
      newItem.innerHTML = '<p>Neues Gerät wurde in den Warenkorb gelegt!</p>';
      cartItems.appendChild(newItem);
    });
  }
  
  // Wenn auf dashboard.html: Lade aktuellen Benutzer und zeige Ansprechpartner und Geräte
  if (window.location.pathname.includes('dashboard.html')) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      document.getElementById('ansName').innerHTML = `<strong>Name:</strong> ${user.ansprechpartner.name}`;
      document.getElementById('ansPhone').innerHTML = `<strong>Telefon:</strong> ${user.ansprechpartner.telefon}`;
      document.getElementById('ansEmail').innerHTML = `<strong>Email:</strong> ${user.ansprechpartner.email}`;
      const profilePic = document.getElementById('profilePic');
      if (profilePic && user.ansprechpartner.imageURL) {
        profilePic.src = user.ansprechpartner.imageURL;
      }
      
      // Zeige Vertragsgeräte des Benutzers
      const deviceList = document.getElementById('deviceList');
      if (deviceList && user.devices) {
        deviceList.innerHTML = '';
        user.devices.forEach(device => {
          const deviceDiv = document.createElement('div');
          deviceDiv.className = 'device-item';
          deviceDiv.innerHTML = `<p><strong>Gerät:</strong> ${device.deviceName} | <strong>Anzahl:</strong> ${device.quantity} | <strong>Monatliche Kosten:</strong> €${device.monthlyCost}</p>`;
          deviceList.appendChild(deviceDiv);
        });
      }
    }
  }
});

// ==============================
// Admin Panel: Admin-Login (admin.html)
// ==============================
document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const adminUsername = document.getElementById('adminUsername').value;
  const adminPassword = document.getElementById('adminPassword').value;
  const admins = loadAdminUsers();
  const admin = admins.find(a => a.username === adminUsername && a.password === adminPassword);
  if (admin) {
    localStorage.setItem('adminLoggedIn', 'true');
    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('adminPanelSection').style.display = 'block';
    displayUsers();
    displayAdminUsers();
  } else {
    document.getElementById('adminLoginError').style.display = 'block';
  }
});

// ==============================
// Admin Panel: Benutzerkonto anlegen (admin.html)
// ==============================
document.getElementById('adminForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;
  const custName = document.getElementById('custName').value;
  const custPhone = document.getElementById('custPhone').value;
  const custEmail = document.getElementById('custEmail').value;
  const custImage = document.getElementById('custImage').value;
  
  let users = await loadUsers();
  if (users.find(u => u.username === newUsername)) {
    alert('Benutzername existiert bereits!');
    return;
  }
  
  const newUser = {
    username: newUsername,
    password: newPassword,
    ansprechpartner: {
      name: custName,
      telefon: custPhone,
      email: custEmail,
      imageURL: custImage
    },
    devices: []
  };
  
  users.push(newUser);
  saveUsers(users);
  displayUsers();
  document.getElementById('adminForm').reset();
});

// Funktion: Zeige Benutzerliste im Admin Panel und biete Bearbeitungs-/Löschoptionen
async function displayUsers() {
  const users = await loadUsers();
  const accountList = document.getElementById('accountList');
  if (accountList) {
    accountList.innerHTML = '';
    users.forEach((user, index) => {
      const userDiv = document.createElement('div');
      userDiv.className = 'account-item';
      userDiv.innerHTML = `<img src="${user.ansprechpartner.imageURL || 'assets/images/ansprechpartner.jpg'}" alt="${user.ansprechpartner.name}">
                           <div>
                             <p><strong>Benutzername:</strong> ${user.username}</p>
                             <p><strong>Ansprechpartner:</strong> ${user.ansprechpartner.name}</p>
                             <button onclick="editUser(${index})">Bearbeiten</button>
                             <button onclick="deleteUser(${index})">Löschen</button>
                           </div>`;
      accountList.appendChild(userDiv);
    });
  }
}

// Funktion: Bearbeite einen Benutzer (über einfache Prompt-Diagramme)
async function editUser(index) {
  let users = await loadUsers();
  let user = users[index];
  let newName = prompt("Neuer Ansprechpartner-Name:", user.ansprechpartner.name);
  let newTelefon = prompt("Neue Telefonnummer:", user.ansprechpartner.telefon);
  let newEmail = prompt("Neue Email:", user.ansprechpartner.email);
  if (newName !== null) user.ansprechpartner.name = newName;
  if (newTelefon !== null) user.ansprechpartner.telefon = newTelefon;
  if (newEmail !== null) user.ansprechpartner.email = newEmail;
  saveUsers(users);
  displayUsers();
}

// Funktion: Lösche einen Benutzer
async function deleteUser(index) {
  let users = await loadUsers();
  if (confirm("Soll der Benutzer wirklich gelöscht werden?")) {
    users.splice(index, 1);
    saveUsers(users);
    displayUsers();
  }
}

// ==============================
// Admin Panel: Vertragsgeräte bearbeiten
// ==============================
document.getElementById('deviceForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const targetUsername = document.getElementById('targetUsername').value;
  const deviceName = document.getElementById('deviceName').value;
  const deviceQuantity = parseInt(document.getElementById('deviceQuantity').value, 10);
  const monthlyCost = parseFloat(document.getElementById('monthlyCost').value);
  
  let users = await loadUsers();
  let user = users.find(u => u.username === targetUsername);
  if (!user) {
    alert("Benutzer nicht gefunden!");
    return;
  }
  let device = user.devices.find(d => d.deviceName === deviceName);
  if (device) {
    device.quantity = deviceQuantity;
    device.monthlyCost = monthlyCost;
  } else {
    user.devices.push({
      deviceName: deviceName,
      quantity: deviceQuantity,
      monthlyCost: monthlyCost
    });
  }
  saveUsers(users);
  alert("Gerät wurde hinzugefügt/aktualisiert.");
  document.getElementById('deviceForm').reset();
});

// ==============================
// Admin Panel: Admin-Zugangsdaten ändern (neuen Admin hinzufügen)
// ==============================
document.getElementById('changeAdminForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const newAdminUsername = document.getElementById('newAdminUsername').value;
  const newAdminPassword = document.getElementById('newAdminPassword').value;
  let admins = loadAdminUsers();
  if (admins.find(a => a.username === newAdminUsername)) {
    alert("Admin-Benutzername existiert bereits!");
    return;
  }
  admins.push({ username: newAdminUsername, password: newAdminPassword });
  saveAdminUsers(admins);
  displayAdminUsers();
  document.getElementById('changeAdminForm').reset();
});

// Funktion: Zeige Admin-Konten im Admin Panel
function displayAdminUsers() {
  let admins = loadAdminUsers();
  const adminList = document.getElementById('adminList');
  if (adminList) {
    adminList.innerHTML = '<h3>Aktuelle Admin-Konten:</h3>';
    admins.forEach(admin => {
      const adminDiv = document.createElement('div');
      adminDiv.innerHTML = `<p><strong>Benutzername:</strong> ${admin.username}</p>`;
      adminList.appendChild(adminDiv);
    });
  }
}

// Beim Laden der Admin-Seite: Falls adminLoggedIn gesetzt, zeige Admin Panel
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('admin.html')) {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      document.getElementById('adminLoginSection').style.display = 'none';
      document.getElementById('adminPanelSection').style.display = 'block';
      displayUsers();
      displayAdminUsers();
    } else {
      document.getElementById('adminLoginSection').style.display = 'block';
      document.getElementById('adminPanelSection').style.display = 'none';
    }
  }
});
