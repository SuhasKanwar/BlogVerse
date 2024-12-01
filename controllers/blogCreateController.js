const { getGroqChatCompletion } = require('../utils/api');
const Blog = require('../models/blogs');

exports.blogCreateRender = (req, res) => {
    return res.render('blogCreate', {
        user: req.user
    });
};

exports.blogCreateHandler = async (req, res) => {
    const { title, body, category } = req.body;
    if(req.file){
        const blog = await Blog.create({
            title,
            body,
            category,
            createdAt: Date.now(),
            createdBy: req.user._id,
            coverImageURL: `/cover-images/${req.file.filename}`
        });
        return res.redirect(`/blog/${blog._id}`);
    }
    else{
        const blog = await Blog.create({
            title,
            body,
            category,
            createdAt: Date.now(),
            createdBy: req.user._id
        });
        return res.redirect(`/blog/${blog._id}`);
    }
};

exports.blogAIRewrite = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Content is required for rewriting.' });
    }

    try {
        const completion = await getGroqChatCompletion(
            `Improve the grammer and words of the provided content do not change the word count, but do not change the meaning of the content, just provide the enhanced content no extra words:\nContent:\n${content}`
        );

        const rewrittenContent = completion.choices[0].message.content.trim();

        res.status(200).json({ rewrittenContent });
    } catch (error) {
        console.error('Error during content rewriting:', error);
        res.status(500).json({ message: 'Failed to rewrite content. Please try again later.' });
    }
};
