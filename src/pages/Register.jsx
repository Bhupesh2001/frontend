import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords must match';
    // Add more validations as per document
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      await api.post('/register', formData);
      await login(formData.loginId, formData.password);
    } catch (error) {
      setErrors({ api: error.response?.data?.message || 'Registration failed' });
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Registration</h2>
      {errors.api && <Alert variant="danger">{errors.api}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Form fields with validation */}
      </Form>
    </div>
  );
};

export default Register;