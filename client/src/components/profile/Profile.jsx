import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
            <Link className='btn btn-link' to="/"><button>Home</button></Link>
        </div>
    );
};

export default Profile;