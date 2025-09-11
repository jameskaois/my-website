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

    async function initSearch() {
        const res = await fetch('/index.json');
        const data = await res.json();

        const fuse = new Fuse(data, {
            keys: ['title', 'description', 'tags'],
            threshold: 0.3,
        });

        const input = document.getElementById('search-input');
        const resultsWrapper = document.querySelector('.search-results-wrapper');
        const resultsList = document.querySelector('.search-results-list');

        input.addEventListener('input', () => {
            const query = input.value.trim();
            resultsList.innerHTML = '';

            if (!query) {
                resultsWrapper.classList.remove('has-results');
                resultsWrapper.classList.add('hidden');
                return;
            }

            const results = fuse.search(query);

            if (results.length > 0) {
                resultsWrapper.classList.remove('hidden');
                resultsWrapper.classList.add('has-results');

                results.forEach(({ item }) => {
                    const article = document.createElement('article');
                    article.className = 'search-result-item';

                    article.innerHTML = `
                    <a href="${item.permalink}">
                        <h2>${item.title}</h2>
                    </a>
                    <div class="post-meta">
                        <i class="fa-regular fa-calendar"></i> ${item.date} <div>•</div> 
        <i class="fa-regular fa-clock"></i> ${item.readingTime} <div>•</div> 
        <i class="fa-solid fa-tags"></i> ${item.tags.join(', ')}
                    </div>
                    <p>${item.description || ''}</p>
                `;

                    resultsList.appendChild(article);
                });
            } else {
                resultsWrapper.classList.remove('hidden');
                resultsWrapper.classList.add('has-results');
                resultsList.innerHTML = `
                <div class="not-found">
                    <p>Oops. No results found.</p>
                </div>
            `;
            }
        });
    }

    initSearch();
})();
