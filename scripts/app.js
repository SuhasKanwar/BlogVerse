function setupFeatureSections(sectionClass) {
    const section = document.querySelector(sectionClass);
    const features = section.querySelectorAll('.features-container');
    
    features.forEach((feature, index) => {
        const explanation = feature.querySelector('.feature-explanation');
        explanation.style.display = index === 0 ? 'block' : 'none';
        // Initial icon rotation state
        const icon = feature.querySelector('.feature i');
        if (index === 0) {
            icon.classList.add('icon-rotate'); // Rotate icon for the first feature
        }
    });

    features.forEach((feature) => {
        const featureHead = feature.querySelector('.feature-head');
        const explanation = feature.querySelector('.feature-explanation');
        const icon = feature.querySelector('.feature i'); // Select the icon

        featureHead.addEventListener('click', () => {
            const currentDisplay = explanation.style.display;

            // Hide all explanations within this section and reset icons
            features.forEach((f) => {
                f.querySelector('.feature-explanation').style.display = 'none';
                f.querySelector('.feature i').classList.remove('icon-rotate'); // Reset rotation
            });

            // Toggle the clicked feature's explanation and icon rotation
            explanation.style.display = currentDisplay === 'none' ? 'block' : 'none';
            icon.classList.toggle('icon-rotate', currentDisplay === 'none'); // Toggle rotation
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupFeatureSections('.section-1');
    setupFeatureSections('.section-2');
    setupFeatureSections('.section-5');
});