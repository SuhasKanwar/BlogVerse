document.querySelector('.ai-rewrite').addEventListener('click', async (e) => {
    e.preventDefault();
    const textarea = document.querySelector('.editor-textarea');
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
            textarea.value = rewrittenContent; // Update the textarea with rewritten content
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error rewriting content:', error);
        alert('An error occurred. Please try again.');
    }
});