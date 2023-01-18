import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.user)



    


    if (user.signedIn) return (
        children
    );

    else if (!user.signedIn) return <Navigate to="/" />;
    else return null;
};

export default ProtectedRoute;