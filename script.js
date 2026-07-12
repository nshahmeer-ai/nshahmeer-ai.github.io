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
            
            // If empty, reset all
            if (!query) {
                sections.forEach(sec => sec.style.display = '');
                tabPanes.forEach(pane => {
                    // Reset inline display styles
                    pane.style.display = '';
                });
                return;
            }

            // Filter sections
            sections.forEach(sec => {
                const text = sec.textContent.toLowerCase();
                if (text.includes(query)) {
                    sec.style.display = '';
                    // Show parent tab pane explicitly during search
                    const parentPane = sec.closest('.tab-pane');
                    if (parentPane) parentPane.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });
            
            // Hide tab panes that have no visible sections
            tabPanes.forEach(pane => {
                const hasVisible = Array.from(pane.querySelectorAll('.content-section')).some(sec => sec.style.display !== 'none');
                if (!hasVisible) {
                    pane.style.display = 'none';
                }
            });
        });
    }
});
