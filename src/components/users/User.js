import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const User = ({ getUser, user, loading }) => {
  const { login } = useParams();

  useEffect(() => {
    getUser(login);
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default User;
