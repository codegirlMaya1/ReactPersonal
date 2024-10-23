import React, { useState, useEffect } from 'react';
import api from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = 1;

  useEffect(() => {
    api.get(`/users/${userId}`).then(response => {
      setUser(response.data);
    });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
    </div>
  );
};

export default Profile;
