document.getElementById('menu-icon').addEventListener('click', function() {
  const navItems = document.getElementById('nav-items');
  this.classList.toggle('active'); // Tambahkan atau hapus kelas active
  if (navItems.style.display === 'none' || navItems.style.display === '') {
      navItems.style.display = 'flex'; // Tampilkan menu
  } else {
      navItems.style.display = 'none'; // Sembunyikan menu
  }
});

// Fungsi untuk mengganti tema
const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  themeSwitcher.textContent = document.body.classList.contains('dark-mode') ? '🎨Switch to Light Mode' : '🎨Switch to Dark Mode';
});

// Fungsi untuk memuat konten halaman secara dinamis
document.addEventListener("DOMContentLoaded", function () {
  const contentDiv = document.querySelector('.content'); // Tempat konten akan dimuat
  const menuLinks = document.querySelectorAll('.nav-items a');

  // Fungsi untuk memuat konten halaman
  function loadPage(page) {
      const xhr = new XMLHttpRequest(); // Buat objek AJAX
      xhr.open("GET", `${page}.html`, true); // Buka file halaman yang sesuai

      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  // Jika berhasil, masukkan konten ke dalam div
                  contentDiv.innerHTML = xhr.responseText;
              } else {
                  // Jika gagal, tampilkan pesan error
                  contentDiv.innerHTML = "<h1>Error 404</h1><p>Halaman tidak ditemukan.</p>";
              }
          }
      };

      xhr.send(); // Kirim permintaan
  }

  // Tambahkan event listener untuk setiap link menu
  menuLinks.forEach(link => {
      link.addEventListener("click", function (event) {
          event.preventDefault(); // Mencegah perilaku default link
          const page = this.getAttribute("data-page"); // Ambil nilai data-page
          loadPage(page); // Muat halaman yang sesuai

          // Sembunyikan menu setelah link diklik (opsional)
          toggleMenu();
      });
  });

  // Muat halaman beranda secara default
  loadPage("home");
});