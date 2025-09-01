import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  const parsedUser = JSON.parse(user);
  if (requiredRole && parsedUser.role !== requiredRole) {
    // If role doesn't match, redirect to correct dashboard
    if (parsedUser.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    } else {
      return <Navigate to="/dashboard/user" replace />;
    }
  }
  return children;
}
