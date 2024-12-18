document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.profile-tab');

    const sections = document.querySelectorAll('.section-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            
            this.classList.add('active');
            
            const sectionToShow = this.getAttribute('data-section');
            
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            document.getElementById(`${sectionToShow}-section`).classList.add('active');
        });
    });
});