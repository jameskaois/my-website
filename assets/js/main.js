(() => {
    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileSidebarCloseBtn = document.querySelector('.mobile-close-btn');

        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });

        mobileSidebarCloseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });

        const tableOfContent = document.getElementById('post-content');
        const postSingle = document.querySelector('.post-single');

        if (postSingle) {
            tableOfContent.style.display = 'block';
        }

        const btn = document.getElementById('scrollToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
})();
