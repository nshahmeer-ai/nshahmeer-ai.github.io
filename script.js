document.addEventListener('DOMContentLoaded', () => {
    // Select all tab links and tab panes
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Mobile tab toggle
    const mobileToggle = document.querySelector('.mobile-tab-toggle');
    const navTabs = document.querySelector('.nav-tabs');
    const currentMobileTab = document.getElementById('currentMobileTab');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navTabs.classList.toggle('open');
        });
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all tabs
            document.querySelectorAll('.nav-tabs li').forEach(li => li.classList.remove('active'));
            
            // Remove active class from all panes
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked tab's parent li
            link.parentElement.classList.add('active');

            // Show target pane
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Update mobile tab text and close menu
            if (currentMobileTab) {
                currentMobileTab.textContent = link.textContent.trim();
                if (navTabs) {
                    navTabs.classList.remove('open');
                }
            }
        });
    });

    // Search bar functionality
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.placeholder = "Search..."; // Update placeholder
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('.content-section');
            const tabPanes = document.querySelectorAll('.tab-pane');
            
            const filterableItems = document.querySelectorAll('.section-list-item, .content-section p');
            const navTabsElement = document.querySelector('.nav-tabs');
            
            // If empty, reset all
            if (!query) {
                filterableItems.forEach(item => item.style.display = '');
                sections.forEach(sec => sec.style.display = '');
                tabPanes.forEach(pane => pane.style.display = '');
                if (navTabsElement) navTabsElement.style.display = '';
                return;
            }

            if (navTabsElement) navTabsElement.style.display = 'none'; // Hide tabs during search

            // Filter individual items
            filterableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });

            // Filter sections based on visible items
            sections.forEach(sec => {
                const items = Array.from(sec.querySelectorAll('.section-list-item, p'));
                if (items.length > 0) {
                    const hasVisible = items.some(item => item.style.display !== 'none');
                    sec.style.display = hasVisible ? '' : 'none';
                } else {
                    // Fallback for sections without list items or paragraphs
                    const text = sec.textContent.toLowerCase();
                    sec.style.display = text.includes(query) ? '' : 'none';
                }
            });
            
            // Show only tab panes that have visible sections
            tabPanes.forEach(pane => {
                const hasVisible = Array.from(pane.querySelectorAll('.content-section')).some(sec => sec.style.display !== 'none');
                pane.style.display = hasVisible ? 'block' : 'none';
            });
        });
    }
});
