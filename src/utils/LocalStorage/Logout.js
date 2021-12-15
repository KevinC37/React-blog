export default function logout() {
  window.localStorage.setItem('auth', false);
  setTimeout(() => {
    window.location.reload();
  }, 1000)
}