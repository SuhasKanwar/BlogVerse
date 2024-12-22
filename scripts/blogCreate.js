document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('.content-textarea');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const form = document.getElementById('blogForm');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.getElementById('closeModal');

    textarea.addEventListener('input', () => {
        const text = textarea.value;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const chars = text.length;

        wordCount.textContent = `${words} words`;
        charCount.textContent = `${chars} characters`;
    });

    form.addEventListener('submit', (e) => {
        const title = document.querySelector('.title-input').value.trim();
        const content = textarea.value.trim();

        if (!title || !content) {
            e.preventDefault();
            modalMessage.textContent = !title ? 'Please enter a title.' : 'Please enter content.';
            modal.classList.remove('hidden');
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});

document.querySelector('.ai-rewrite').addEventListener('click', async (e) => {
    e.preventDefault();
    const textarea = document.querySelector('.content-textarea');
    const currentContent = textarea.value;

    if (!currentContent.trim()) {
        alert('Please provide some content to rewrite.');
        return;
    }

    try {
        const response = await fetch('/blog/ai-rewrite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: currentContent }),
        });

        if (response.ok) {
            const { rewrittenContent } = await response.json();
            textarea.value = rewrittenContent;
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error rewriting content:', error);
        alert('An error occurred. Please try again.');
    }
});