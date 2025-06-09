import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/UI/Button';
import { useAppDispatch } from '../../hooks/redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const BackButton = styled(Button)`
  margin-bottom: 24px;
`;

const AuthCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  color: #111827;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: none;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#3b82f6' : 'transparent'};
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  
  &:hover {
    color: #3b82f6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input<{ error?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.error ? '#ef4444' : '#e5e7eb'};
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#ef4444' : '#3b82f6'};
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 14px;
`;

const SubmitButton = styled(Button)`
  margin-top: 8px;
`;

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const loginForm = useForm<LoginForm>();
  const registerForm = useForm<RegisterForm>();

  const handleBack = () => {
    navigate('/');
  };

  // Замініть ці частини в handleLogin та handleRegister функціях:

const handleLogin = async (data: LoginForm) => {
  try {
    dispatch(loginStart());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const user = {
      id: '1',
      email: data.email,
      firstName: 'John',
      lastName: 'Doe'
    };
    
    dispatch(loginSuccess(user));
    navigate('/');
  } catch (err) {
    console.error('Login error:', err);
    dispatch(loginFailure('Login failed. Please try again.'));
  }
};

const handleRegister = async (data: RegisterForm) => {
  if (data.password !== data.confirmPassword) {
    registerForm.setError('confirmPassword', {
      type: 'manual',
      message: 'Passwords do not match'
    });
    return;
  }

  try {
    dispatch(loginStart());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const user = {
      id: '2',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };
    
    dispatch(loginSuccess(user));
    navigate('/');
  } catch (err) {
    console.error('Registration error:', err);
    dispatch(loginFailure('Registration failed. Please try again.'));
  }
};

  return (
    <Container>
      <BackButton variant="outline" onClick={handleBack}>
        ← Back to Shop
      </BackButton>

      <AuthCard>
        <Title>Welcome to Guitar Shop</Title>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
            type="button"
          >
            Login
          </Tab>
          <Tab 
            active={activeTab === 'register'} 
            onClick={() => setActiveTab('register')}
            type="button"
          >
            Register
          </Tab>
        </TabContainer>

        {activeTab === 'login' ? (
          <Form onSubmit={loginForm.handleSubmit(handleLogin)}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                {...loginForm.register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={!!loginForm.formState.errors.email}
              />
              {loginForm.formState.errors.email && (
                <ErrorMessage>{loginForm.formState.errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                {...loginForm.register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={!!loginForm.formState.errors.password}
              />
              {loginForm.formState.errors.password && (
                <ErrorMessage>{loginForm.formState.errors.password.message}</ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton 
              type="submit" 
              size="large"
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
            </SubmitButton>
          </Form>
        ) : (
          <Form onSubmit={registerForm.handleSubmit(handleRegister)}>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                {...registerForm.register('firstName', { required: 'First name is required' })}
                error={!!registerForm.formState.errors.firstName}
              />
              {registerForm.formState.errors.firstName && (
                <ErrorMessage>{registerForm.formState.errors.firstName.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                {...registerForm.register('lastName', { required: 'Last name is required' })}
                error={!!registerForm.formState.errors.lastName}
              />
              {registerForm.formState.errors.lastName && (
                <ErrorMessage>{registerForm.formState.errors.lastName.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                {...registerForm.register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={!!registerForm.formState.errors.email}
              />
              {registerForm.formState.errors.email && (
                <ErrorMessage>{registerForm.formState.errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                {...registerForm.register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={!!registerForm.formState.errors.password}
              />
              {registerForm.formState.errors.password && (
                <ErrorMessage>{registerForm.formState.errors.password.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                {...registerForm.register('confirmPassword', { required: 'Please confirm password' })}
                error={!!registerForm.formState.errors.confirmPassword}
              />
              {registerForm.formState.errors.confirmPassword && (
                <ErrorMessage>{registerForm.formState.errors.confirmPassword.message}</ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton 
              type="submit" 
              size="large"
              disabled={registerForm.formState.isSubmitting}
            >
              {registerForm.formState.isSubmitting ? 'Creating Account...' : 'Register'}
            </SubmitButton>
          </Form>
        )}
      </AuthCard>
    </Container>
  );
};