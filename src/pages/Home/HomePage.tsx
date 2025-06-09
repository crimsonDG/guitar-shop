import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GuitarCard } from '../../components/UI/GuitarCard';
import { Button } from '../../components/UI/Button';
import { useAppDispatch } from '../../hooks/redux';
import { setLoading, setError } from '../../store/slices/guitarSlice';
import { guitarService } from '../../services/guitarService';
import type { Guitar } from '../../types/guitar';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="guitar" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><text x="50" y="50" font-size="30" text-anchor="middle" fill="rgba(255,255,255,0.1)">🎸</text></pattern></defs><rect width="1000" height="1000" fill="url(%23guitar)"/></svg>');
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 72px;
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(45deg, #fff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HeroButton = styled(Button)`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: none;
  padding: 20px 40px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
  }
`;

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  width: 100%;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #1e293b;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const FeaturedSection = styled.section`
  padding: 100px 0;
  background: white;
  width: 100%;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
`;

const ViewAllButton = styled(Button)`
  margin: 60px auto 0;
  display: block;
  background: linear-gradient(45deg, #667eea, #764ba2);
  padding: 16px 32px;
  font-size: 18px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 18px;
  color: #6b7280;
`;

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoadingState] = useState(false);
  const [featuredGuitars, setFeaturedGuitars] = useState<Guitar[]>([]);

  const loadFeaturedGuitars = useCallback(async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const guitars = await guitarService.getFeaturedGuitars();
      setFeaturedGuitars(guitars);
    } catch (error) {
      console.error('Error loading featured guitars:', error);
      dispatch(setError('Error loading featured guitars'));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadFeaturedGuitars();
  }, [loadFeaturedGuitars]);

  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleViewCatalog = () => {
    navigate('/catalog');
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Find Your Perfect Guitar</HeroTitle>
          <HeroSubtitle>
            Discover premium guitars from world-renowned brands. 
            From electric to acoustic, find the instrument that speaks to your soul.
          </HeroSubtitle>
          <HeroButton onClick={handleViewCatalog}>
            Explore Our Collection
          </HeroButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionContainer>
          <SectionTitle>Why Choose Guitar Shop?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Premium Quality</FeatureTitle>
              <FeatureDescription>
                We only stock guitars from trusted manufacturers with proven track records of excellence.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🚚</FeatureIcon>
              <FeatureTitle>Fast Shipping</FeatureTitle>
              <FeatureDescription>
                Get your dream guitar delivered to your doorstep with our express shipping options.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>Expert Support</FeatureTitle>
              <FeatureDescription>
                Our team of guitar experts is here to help you make the perfect choice for your needs.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </SectionContainer>
      </FeaturesSection>

      <FeaturedSection>
        <SectionContainer>
          <SectionTitle>Featured Guitars</SectionTitle>
          {loading ? (
            <LoadingSpinner>Loading featured guitars...</LoadingSpinner>
          ) : (
            <>
              <FeaturedGrid>
                {featuredGuitars.map(guitar => (
                  <GuitarCard
                    key={guitar.id}
                    guitar={guitar}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </FeaturedGrid>
              <ViewAllButton onClick={handleViewCatalog}>
                View All Guitars
              </ViewAllButton>
            </>
          )}
        </SectionContainer>
      </FeaturedSection>
    </Container>
  );
};