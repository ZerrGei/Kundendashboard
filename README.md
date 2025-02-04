<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kundendashboard</title>
  <!-- Bootstrap CSS einbinden -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <style>
    /* Einfaches Styling für das Dashboard */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .sidebar {
      background-color: #343a40;
      color: #fff;
      min-height: 100vh;
      padding: 20px;
    }
    .sidebar .nav-link {
      color: #fff;
      margin-bottom: 10px;
    }
    .content {
      padding: 20px;
    }
    .header {
      background-color: #007bff;
      color: #fff;
      padding: 15px;
    }
  </style>
</head>
<body>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <nav class="col-md-2 sidebar">
        <h3>Dashboard</h3>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" href="#">Übersicht</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Kunden</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Berichte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Einstellungen</a>
          </li>
        </ul>
      </nav>
      <!-- Hauptinhalt -->
      <main class="col-md-10 content">
        <div class="header">
          <h1>Willkommen zum Kundendashboard</h1>
        </div>
        <section>
          <p>Hier findest du alle relevanten Informationen auf einen Blick.</p>
          <!-- Beispiel für Dashboard-Karten -->
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Kundenanzahl</h5>
                  <p class="card-text">1234</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Offene Anfragen</h5>
                  <p class="card-text">56</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Umsatz</h5>
                  <p class="card-text">€7.890</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

  <!-- JavaScript-Bibliotheken einbinden -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
  <script>
    // Hier kannst du zusätzlichen JavaScript-Code einfügen,
    // z.B. für Interaktionen oder das Laden dynamischer Inhalte.
    console.log("Kundendashboard geladen!");
  </script>
</body>
</html>
