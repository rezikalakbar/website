// Fungsi untuk toggle menu
function toggleMenu() {
    const menuList = document.getElementById('menuList');
    const menuIcon = document.querySelector('.menu-icon');
    menuList.classList.toggle('active');
    menuIcon.classList.toggle('active');
}

// Fungsi untuk memuat konten halaman secara dinamis
document.addEventListener("DOMContentLoaded", function () {
    const contentDiv = document.querySelector('.content'); // Tempat konten akan dimuat
    const menuLinks = document.querySelectorAll('.menu-list a');

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