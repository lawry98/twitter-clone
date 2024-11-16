import React, { useState } from 'react';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle post submission logic here
        console.log('Post submitted:', { title, content });
    };

    return (
        <div>
            Add Posts component coming soon!
        </div>
    );
};

export default AddPost;