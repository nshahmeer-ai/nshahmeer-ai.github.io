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
});
