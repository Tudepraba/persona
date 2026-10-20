// Ikuti tema terang/gelap dari perangkat
const tema = window.matchMedia('(prefers-color-scheme: dark)');
const terapkanTema = () => {
    document.documentElement.setAttribute('data-bs-theme', tema.matches ? 'dark' : 'light');
};
terapkanTema();
tema.addEventListener('change', terapkanTema);

// Tutup menu mobile setelah salah satu menu diklik
document.querySelectorAll('#menu-utama .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('menu-utama');
        if (menu.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});
