// Copiloto 24x7 — background service worker
// Abre o sidePanel quando a enfermeira clica no ícone da extensão

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch(function(err) { console.error('sidePanel.setPanelBehavior:', err); });
