import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';

function CreatePostButton() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user] = useAtom(userAtom);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      article: {
        title: title,
        content: content,
        user_id: user.id,
      }
    };

    try {
      const response = await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.log('Le post a été créé avec succès');
      } else {
        console.error('Erreur lors de la création du post');
      }
    } catch (error) {
      console.error('Erreur lors de la création du post :', error);
    }
  };

  return (
    <div>
      <h2>Création d'un nouveau post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <textarea
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Contenu :</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button class="bg-primary" type="submit">Créer le post</button>
      </form>
    </div>
  );
}

export default CreatePostButton;

