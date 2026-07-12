document.addEventListener('DOMContentLoaded', () => {
    // Select all tab links and tab panes
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

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
        });
    });

    // Search bar functionality
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.placeholder = "Search portfolio..."; // Update placeholder
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('.content-section');
            
            // If empty, reset all
            if (!query) {
                sections.forEach(sec => sec.style.display = '');
                return;
            }

            // Filter sections
            sections.forEach(sec => {
                const text = sec.textContent.toLowerCase();
                if (text.includes(query)) {
                    sec.style.display = '';
                } else {
                    sec.style.display = 'none';
                }
            });
            
            // Force show active tab content container even if some sections are hidden
            const activePane = document.querySelector('.tab-pane.active');
            if(activePane) activePane.style.display = '';
        });
    }
});
