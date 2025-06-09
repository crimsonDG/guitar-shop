import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';

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

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #111827;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const CartItems = styled.div``;

const CartSummary = styled.div`
  background-color: #f9fafb;
  padding: 24px;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 24px;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div``;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #111827;
`;

const ItemBrand = styled.p`
  color: #6b7280;
  margin: 0 0 8px 0;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6;
  margin: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: #fef2f2;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #111827;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SummaryLabel = styled.span`
  color: #6b7280;
`;

const SummaryValue = styled.span`
  font-weight: 600;
  color: #111827;
`;

const TotalRow = styled(SummaryRow)`
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const TotalLabel = styled(SummaryLabel)`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

const TotalValue = styled(SummaryValue)`
  font-size: 18px;
  color: #3b82f6;
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-bottom: 12px;
`;

const ClearButton = styled(Button)`
  width: 100%;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 48px;
  color: #6b7280;
`;

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);

  const handleBack = () => {
    navigate('/');
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented in the next step!');
  };

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <Container>
        <BackButton variant="outline" onClick={handleBack}>
          ← Continue Shopping
        </BackButton>
        
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Add some guitars to get started!</p>
          <Button onClick={handleBack} style={{ marginTop: '16px' }}>
            Browse Guitars
          </Button>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton variant="outline" onClick={handleBack}>
        ← Continue Shopping
      </BackButton>
      
      <Title>Shopping Cart ({itemsCount} items)</Title>

      <CartGrid>
        <CartItems>
          {items.map(item => (
            <CartItem key={item.guitar.id}>
              <ItemImage src={item.guitar.imageUrl} alt={item.guitar.name} />
              
              <ItemInfo>
                <ItemName>{item.guitar.name}</ItemName>
                <ItemBrand>{item.guitar.brand}</ItemBrand>
                <ItemPrice>${item.guitar.price}</ItemPrice>
              </ItemInfo>

              <QuantityControl>
                 <QuantityButton
                    onClick={() => handleUpdateQuantity(item.guitar.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    data-testid="quantity-decrease"
                  >
                  -
                </QuantityButton>
                  <QuantityDisplay data-testid="quantity-display">{item.quantity}</QuantityDisplay>
                  <QuantityButton
                     onClick={() => handleUpdateQuantity(item.guitar.id, item.quantity + 1)}
                     data-testid="quantity-increase"
                  >
                  +
                </QuantityButton>
              </QuantityControl>

              <RemoveButton 
                onClick={() => handleRemoveItem(item.guitar.id)}
                data-testid="remove-item"
              >
              🗑️
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummaryRow>
            <SummaryLabel>Subtotal:</SummaryLabel>
            <SummaryValue>${subtotal.toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Shipping:</SummaryLabel>
            <SummaryValue>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Tax:</SummaryLabel>
            <SummaryValue>${tax.toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <TotalRow>
            <TotalLabel>Total:</TotalLabel>
            <TotalValue>${finalTotal.toFixed(2)}</TotalValue>
          </TotalRow>

          <CheckoutButton size="large" onClick={handleCheckout}>
            Proceed to Checkout
          </CheckoutButton>
          
          <ClearButton 
            variant="outline" 
            onClick={handleClearCart}
            data-testid="clear-cart"
          >
          Clear Cart
          </ClearButton>
        </CartSummary>
      </CartGrid>
    </Container>
  );
};