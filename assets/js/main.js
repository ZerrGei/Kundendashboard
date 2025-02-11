// Funktion zum Laden der Benutzer (prüft localStorage, sonst JSON)
async function loadUsers() {
  let users = localStorage.getItem('users');
  if (users) {
    return JSON.parse(users);
  } else {
    try {
      const response = await fetch('data/users.json');
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Benutzerdaten.');
      }
      users = await response.json();
      localStorage.setItem('users', JSON.stringify(users));
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

// Funktion zum Speichern der Benutzer
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Login-Funktionalität (index.html)
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

// Warenkorb: Artikel hinzufügen (in dashboard.html)
document.addEventListener('DOMContentLoaded', function() {
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
  
  // Admin Panel: Konto anlegen (in admin.html)
  const adminForm = document.getElementById('adminForm');
  if (adminForm) {
    adminForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const newUsername = document.getElementById('newUsername').value;
      const newPassword = document.getElementById('newPassword').value;
      const custName = document.getElementById('custName').value;
      const custPhone = document.getElementById('custPhone').value;
      const custEmail = document.getElementById('custEmail').value;
      const custImage = document.getElementById('custImage').value;
      
      let users = await loadUsers();
      // Überprüfe, ob der Benutzername bereits existiert
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
        }
      };
      
      users.push(newUser);
      saveUsers(users);
      displayUsers();
      adminForm.reset();
    });
  }
  
  // Funktion, um im Admin Panel die Benutzer anzuzeigen
  async function displayUsers() {
    const users = await loadUsers();
    const accountList = document.getElementById('accountList');
    if (accountList) {
      accountList.innerHTML = '';
      users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'account-item';
        userDiv.innerHTML = `<img src="${user.ansprechpartner.imageURL || 'assets/images/ansprechpartner.jpg'}" alt="${user.ansprechpartner.name}">
                             <div>
                               <p><strong>Benutzername:</strong> ${user.username}</p>
                               <p><strong>Ansprechpartner:</strong> ${user.ansprechpartner.name}</p>
                             </div>`;
        accountList.appendChild(userDiv);
      });
    }
  }
  
  // Falls wir uns auf der Admin-Seite befinden, Benutzerliste anzeigen
  if (window.location.pathname.includes('admin.html')) {
    displayUsers();
  }
  
  // Dashboard: Den aktuell angemeldeten Benutzer laden und anzeigen
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
    }
  }
});
