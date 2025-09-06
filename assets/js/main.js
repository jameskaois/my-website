(() => {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileSidebarCloseBtn = document.querySelector('.mobile-close-btn');

    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
    });

    mobileSidebarCloseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
    });
})();
