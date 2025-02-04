// Login-Funktionalität
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === '123' && password === '123') {
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

// Warenkorb: Artikel hinzufügen
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
  
  // Admin Panel: Konto anlegen
  const adminForm = document.getElementById('adminForm');
  if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('custName').value;
      const email = document.getElementById('custEmail').value;
      const phone = document.getElementById('custPhone').value;
      const imageUrl = document.getElementById('custImage').value;
      
      // Erstelle ein neues Konto-Element und füge es zur Liste hinzu
      const accountList = document.getElementById('accountList');
      const accountDiv = document.createElement('div');
      accountDiv.className = 'account-item';
      accountDiv.innerHTML = `<img src="${imageUrl}" alt="${name}">
                              <div>
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Telefon:</strong> ${phone}</p>
                              </div>`;
      accountList.appendChild(accountDiv);
      
      // Formular zurücksetzen
      adminForm.reset();
    });
  }
});
