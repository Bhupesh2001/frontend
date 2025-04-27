import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    loginId: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.loginId.trim()) newErrors.loginId = 'Login ID is required';
    if (!credentials.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await api.get(
        `/login?loginId=${credentials.loginId}&password=${credentials.password}`
      );
      login(credentials.loginId);
      navigate('/');
    } catch (error) {
      setErrors({ api: 'Invalid login credentials' });
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">User Login</h2>
              {errors.api && <Alert variant="danger">{errors.api}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Login ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter login ID"
                    value={credentials.loginId}
                    onChange={(e) => setCredentials({ ...credentials, loginId: e.target.value })}
                    isInvalid={!!errors.loginId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.loginId}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;