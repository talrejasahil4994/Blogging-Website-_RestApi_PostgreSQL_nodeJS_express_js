// Persistent dark mode toggle for all pages
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('darkMode', enabled ? 'on' : 'off');
}
// On load, set mode from localStorage
setDarkMode(localStorage.getItem('darkMode') === 'on');
const toggleBtn = document.getElementById('darkModeToggle');
if (toggleBtn) {
  toggleBtn.onclick = function() {
    const enabled = !document.body.classList.contains('dark-mode');
    setDarkMode(enabled);
  };
}