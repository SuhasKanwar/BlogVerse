const directGreetBtns = document.querySelectorAll('.direct-greet-btn');
const directBlogCreateBtns = document.querySelectorAll('.direct-blogCreate-btn');
const directCollectionsBtns = document.querySelectorAll('.direct-collections-btn');

directGreetBtns.forEach(directGreetBtn => {
    directGreetBtn.addEventListener("click", () => {
        window.location.href = '/greet';
    });
});

directBlogCreateBtns.forEach(directBlogCreateBtn => {
    directBlogCreateBtn.addEventListener("click", () => {
        window.location.href = '/blog-create';
    })
})

directCollectionsBtns.forEach(directCollectionsBtn => {
    directCollectionsBtn.addEventListener("click", () => {
        window.location.href = '/collections';
    })
})

function setupFeatureSections(sectionClass) {
    const section = document.querySelector(sectionClass);
    const features = section.querySelectorAll('.features-container');
    
    features.forEach((feature, index) => {
        const explanation = feature.querySelector('.feature-explanation');
        explanation.style.display = index === 0 ? 'block' : 'none';
        const icon = feature.querySelector('.feature i');
        if (index === 0) {
            icon.classList.add('icon-rotate');
        }
    });

    features.forEach((feature) => {
        const featureHead = feature.querySelector('.feature-head');
        const explanation = feature.querySelector('.feature-explanation');
        const icon = feature.querySelector('.feature i');

        featureHead.addEventListener('click', () => {
            const currentDisplay = explanation.style.display;

            features.forEach((f) => {
                f.querySelector('.feature-explanation').style.display = 'none';
                f.querySelector('.feature i').classList.remove('icon-rotate');
            });

            explanation.style.display = currentDisplay === 'none' ? 'block' : 'none';
            icon.classList.toggle('icon-rotate', currentDisplay === 'none');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupFeatureSections('.section-1');
    setupFeatureSections('.section-2');
    setupFeatureSections('.section-5');
});