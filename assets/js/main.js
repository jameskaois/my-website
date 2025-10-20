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

        const postContent = document.querySelector('.post-single .post-content');
        if (!postContent) return;

        // Create overlay and zoomed image container
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.cursor = 'zoom-out';
        overlay.style.zIndex = '9999';
        overlay.style.transition = 'opacity 0.25s ease';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';

        const zoomedImg = document.createElement('img');
        zoomedImg.style.maxWidth = '90%';
        zoomedImg.style.maxHeight = '90%';
        zoomedImg.style.borderRadius = '8px';
        zoomedImg.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        zoomedImg.style.transition = 'transform 0.3s ease';
        overlay.appendChild(zoomedImg);

        document.body.appendChild(overlay);

        let isZoomed = false;

        // When clicking an image inside post
        postContent.querySelectorAll('img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                zoomedImg.src = img.src;
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                isZoomed = true;
            });
        });

        // Close zoom when clicking overlay
        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            isZoomed = false;
        });

        // Close on ESC key
        document.addEventListener('keydown', e => {
            if (isZoomed && e.key === 'Escape') {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                isZoomed = false;
            }
        });
    });

    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    const mobileCancelBtn = document.querySelector('.cancel-btn');

    mobileSearchBtn.addEventListener('click', () => {
        const mobileSearchLayout = document.querySelector('.mobile-search-layout');
        mobileSearchLayout.classList.toggle('show');
    });

    mobileCancelBtn.addEventListener('click', () => {
        const mobileSearchLayout = document.querySelector('.mobile-search-layout');
        mobileSearchLayout.classList.toggle('show');
    });

    async function initSearch() {
        const res = await fetch('/index.json');
        const data = await res.json();
        const appWidth = window.innerWidth;

        const fuse = new Fuse(data, {
            keys: ['title', 'tags', 'description'],
            threshold: 0.3,
        });

        const input = document.getElementById(
            appWidth <= 849 ? 'mobile-search-input' : 'search-input',
        );
        const resultsWrapper = document.querySelector('.search-results-wrapper');
        const resultsList = document.querySelector(
            appWidth <= 849 ? '.mobile-search-results-list' : '.search-results-list',
        );

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
