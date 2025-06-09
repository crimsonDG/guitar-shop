import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { Guitar } from '../../types/guitar';
import { Button } from '../../components/UI/Button';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/slices/cartSlice';
import { guitarService } from '../../services/guitarService';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 20px;
  width: 100%;
  min-height: 100vh;
`;

const BackButton = styled(Button)`
  margin-bottom: 24px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ImageSection = styled.div``;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InfoSection = styled.div``;

const Brand = styled.p`
  color: #6b7280;
  font-size: 16px;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const ProductName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #111827;
`;

const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #3b82f6;
  margin: 0 0 16px 0;
`;

const StockStatus = styled.div<{ inStock: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 24px;
  ${props => props.inStock 
    ? 'background-color: #d1fae5; color: #065f46;' 
    : 'background-color: #fee2e2; color: #991b1b;'
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const Stars = styled.div`
  color: #fbbf24;
  font-size: 20px;
`;

const ReviewCount = styled.span`
  color: #6b7280;
  font-size: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 32px;
`;

const SpecsSection = styled.div`
  background-color: #f9fafb;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 32px;
`;

const SpecsTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #111827;
`;

const SpecsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
`;

const SpecLabel = styled.span`
  font-weight: 500;
  color: #6b7280;
`;

const SpecValue = styled.span`
  color: #111827;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 18px;
  color: #6b7280;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 18px;
  color: #ef4444;
  background-color: #fef2f2;
  border-radius: 8px;
`;

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGuitar = async () => {
      if (!id) {
        setError('Guitar ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await guitarService.getGuitarById(id);
        if (data) {
          setGuitar(data);
        } else {
          setError('Guitar not found');
        }
      } catch (err) {
        console.error('Error loading guitar:', err);
        setError('Error loading guitar details');
      } finally {
        setLoading(false);
      }
    };

    loadGuitar();
  }, [id]);

  const handleAddToCart = () => {
    if (guitar) {
      dispatch(addToCart(guitar));
    }
  };

  const handleBack = () => {
    navigate('/catalog'); // Виправлено: тепер перенаправляє на каталог
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </>
    );
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading guitar details...</LoadingSpinner>
      </Container>
    );
  }

  if (error || !guitar) {
    return (
      <Container>
        <ErrorMessage>
          {error || 'Guitar not found'}
          <br />
          <Button onClick={handleBack} style={{ marginTop: '16px' }}>
            Back to Catalog
          </Button>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
       <BackButton variant="outline" onClick={handleBack}>
      ← Back to Catalog
    </BackButton>

    <ProductGrid>
      <ImageSection>
        <ProductImage src={guitar.imageUrl} alt={guitar.name} />
      </ImageSection>

      <InfoSection>
        <Brand>{guitar.brand}</Brand>
        <ProductName data-testid="product-name">{guitar.name}</ProductName>
        <Price data-testid="product-price">${guitar.price}</Price>

        <StockStatus inStock={guitar.inStock}>
          {guitar.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </StockStatus>

        <Rating>
          <Stars>{renderStars(guitar.rating)}</Stars>
          <ReviewCount>({guitar.reviewsCount} reviews)</ReviewCount>
        </Rating>

        <Description data-testid="product-description">{guitar.description}</Description>

        <ActionSection>
          <Button 
            size="large"
            disabled={!guitar.inStock}
            onClick={handleAddToCart}
          >
            Add to Cart - ${guitar.price}
          </Button>
        </ActionSection>
      </InfoSection>
    </ProductGrid>

      <SpecsSection>
        <SpecsTitle>Specifications</SpecsTitle>
        <SpecsList>
          <SpecItem>
            <SpecLabel>Body Material:</SpecLabel>
            <SpecValue>{guitar.specifications.bodyMaterial}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Neck Material:</SpecLabel>
            <SpecValue>{guitar.specifications.neckMaterial}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Fingerboard:</SpecLabel>
            <SpecValue>{guitar.specifications.fingerboard}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Strings:</SpecLabel>
            <SpecValue>{guitar.specifications.strings}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Scale:</SpecLabel>
            <SpecValue>{guitar.specifications.scale}</SpecValue>
          </SpecItem>
          {guitar.specifications.pickups && (
            <SpecItem>
              <SpecLabel>Pickups:</SpecLabel>
              <SpecValue>{guitar.specifications.pickups}</SpecValue>
            </SpecItem>
          )}
        </SpecsList>
      </SpecsSection>
    </Container>
  );
};