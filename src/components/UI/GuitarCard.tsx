import styled from 'styled-components';
import { useState } from 'react';
import type { Guitar } from '../../types/guitar';
import { Button } from './Button';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/slices/cartSlice';

interface GuitarCardProps {
  guitar: Guitar;
  onViewDetails?: (id: string) => void;
}

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const FallbackIcon = styled.div`
  font-size: 48px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
`;

const StockBadge = styled.span<{ inStock: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  backdrop-filter: blur(10px);
  ${props => props.inStock 
    ? 'background: rgba(16, 185, 129, 0.9); color: white;' 
    : 'background: rgba(239, 68, 68, 0.9); color: white;'
  }
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 24px;
`;

const Brand = styled.p`
  color: #667eea;
  font-size: 14px;
  margin: 0 0 8px 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #1e293b;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Price = styled.div`
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Stars = styled.div`
  color: #fbbf24;
  font-size: 16px;
`;

const ReviewCount = styled.span`
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const DetailsButton = styled(Button)`
  flex: 1;
  background: transparent;
  border: 2px solid #e2e8f0;
  color: #475569;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

const AddToCartButton = styled(Button)`
  flex: 1;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    box-shadow: none;
    transform: none;
  }
`;

export const GuitarCard = ({ guitar, onViewDetails }: GuitarCardProps) => {
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = () => {
    dispatch(addToCart(guitar));
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
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

  return (
    <Card data-testid="guitar-card">
      <ImageContainer>
        {!imageError ? (
          <Image 
            src={guitar.imageUrl} 
            alt={guitar.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        ) : null}
        
        {(imageError || imageLoading) && (
          <FallbackIcon>
            🎸
          </FallbackIcon>
        )}
        
        <FavoriteButton>
          ♡
        </FavoriteButton>
        <StockBadge inStock={guitar.inStock}>
          {guitar.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </StockBadge>
      </ImageContainer>
      
      <Content>
        <Brand>{guitar.brand}</Brand>
        <Name data-testid="guitar-name">{guitar.name}</Name>
        
        <PriceContainer>
          <Price data-testid="guitar-price">${guitar.price}</Price>
          <Rating>
            <Stars>{renderStars(guitar.rating)}</Stars>
            <ReviewCount>({guitar.reviewsCount})</ReviewCount>
          </Rating>
        </PriceContainer>
        
        <ButtonGroup>
          <DetailsButton 
            size="small"
            onClick={() => onViewDetails?.(guitar.id)}
          >
            Details
          </DetailsButton>
          <AddToCartButton 
            size="small"
            disabled={!guitar.inStock}
            onClick={handleAddToCart}
          >
            Add to Cart
          </AddToCartButton>
        </ButtonGroup>
      </Content>
    </Card>
  );
};