import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from '../../components/UI/Button';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  margin: 0;
  padding: 0;
`;

const Header = styled.section`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
  width: 100%;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  opacity: 0.9;
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
  width: 100%;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1e293b;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
`;

const InfoIcon = styled.div`
  font-size: 24px;
  width: 48px;
  height: 48px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContent = styled.div``;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1e293b;
`;

const InfoText = styled.p`
  color: #64748b;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

const Input = styled.input<{ error?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.error ? '#ef4444' : '#e5e7eb'};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#ef4444' : '#3b82f6'};
  }
`;

const TextArea = styled.textarea<{ error?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.error ? '#ef4444' : '#e5e7eb'};
  border-radius: 8px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#ef4444' : '#3b82f6'};
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  padding: 16px 32px;
  font-size: 16px;
`;

const BackButton = styled(Button)`
  margin-bottom: 24px;
`;

export const ContactPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form submitted:', data);
      setIsSubmitted(true);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Contact Us</Title>
          <Subtitle>We're here to help with all your guitar needs</Subtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <BackButton variant="outline" onClick={handleBack}>
          ← Back to Home
        </BackButton>

        <ContentGrid>
          <ContactInfo>
            <SectionTitle>Get in Touch</SectionTitle>
            
            <InfoItem>
              <InfoIcon>📍</InfoIcon>
              <InfoContent>
                <InfoTitle>Visit Our Store</InfoTitle>
                <InfoText>123 Music Street, Guitar City, GC 12345</InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>📞</InfoIcon>
              <InfoContent>
                <InfoTitle>Call Us</InfoTitle>
                <InfoText>+1 (555) 123-4567</InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>✉️</InfoIcon>
              <InfoContent>
                <InfoTitle>Email Us</InfoTitle>
                <InfoText>info@guitarshop.com</InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>🕒</InfoIcon>
              <InfoContent>
                <InfoTitle>Store Hours</InfoTitle>
                <InfoText>Mon-Fri: 9AM-7PM<br />Sat-Sun: 10AM-6PM</InfoText>
              </InfoContent>
            </InfoItem>
          </ContactInfo>

          <ContactForm>
            <SectionTitle>Send us a Message</SectionTitle>
            
            {isSubmitted && (
              <SuccessMessage>
                Thank you for your message! We'll get back to you soon.
              </SuccessMessage>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>Name *</Label>
                <Input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  error={!!errors.name}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={!!errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Subject *</Label>
                <Input
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  error={!!errors.subject}
                />
                {errors.subject && <ErrorMessage>{errors.subject.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Message *</Label>
                <TextArea
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    }
                  })}
                  error={!!errors.message}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
              </FormGroup>

              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                size="large"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </Form>
          </ContactForm>
        </ContentGrid>
      </MainContent>
    </Container>
  );
};