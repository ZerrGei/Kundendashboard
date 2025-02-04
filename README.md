<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Login - Kundendashboard</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="login-container">
    <h2>Anmelden</h2>
    <form id="loginForm">
      <label for="username">Benutzername:</label>
      <input type="text" id="username" name="username" required>
      <label for="password">Passwort:</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Login</button>
    </form>
    <div id="loginError" class="error">Ungültige Anmeldedaten!</div>
  </div>
  <script src="assets/js/main.js"></script>
</body>
</html>
