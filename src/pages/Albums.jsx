import React, { useState, useEffect } from 'react';
import api from '../api'; // Assuming you have an api.js file for other API interactions

const Albums = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoId, setPhotoId] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20');
      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleUpdatePhoto = (id) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === id ? { ...photo, title, description } : photo
    );
    setPhotos(updatedPhotos);
    setTitle('');
    setDescription('');
    setPhotoId('');
  };

  const handleDeletePhoto = (id) => {
    const remainingPhotos = photos.filter(photo => photo.id !== id);
    setPhotos(remainingPhotos);
  };

  return (
    <div>
      <h2>Albums</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={photoId}
          onChange={(e) => setPhotoId(e.target.value)}
          placeholder="Photo ID (for update/delete)"
          className="form-control"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="form-control"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="form-control"
        />
        <button onClick={() => handleUpdatePhoto(parseInt(photoId))} className="btn btn-warning mt-2">Update Photo</button>
      </form>
      <ul className="list-group mt-3">
        {photos.map(photo => (
          <li key={photo.id} className="list-group-item">
            <div>
              <img src={photo.url} alt={photo.title} className="img-fluid" />
              <h5>{photo.title}</h5>
              <p>{photo.description}</p>
              <small>ID: {photo.id}</small>
              <button onClick={() => handleDeletePhoto(photo.id)} className="btn btn-danger btn-sm mt-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
