import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../UI/Button';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 16px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const NavLink = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#667eea' : 'white'};
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px 16px;
  border-radius: 8px;
  position: relative;
  
  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  ${props => props.active && `
    background: rgba(102, 126, 234, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: #667eea;
      border-radius: 50%;
    }
  `}
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CartSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CartInfo = styled.div`
  text-align: right;
  font-size: 14px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartButton = styled(Button)`
  position: relative;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserInfo = styled.div`
  text-align: right;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const WelcomeText = styled.div`
  font-size: 12px;
  color: #cbd5e1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: white;
  font-size: 14px;
`;

const AuthButton = styled(Button)`
  background: linear-gradient(45deg, #10b981, #059669);
  border: none;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }
`;

const LogoutButton = styled(Button)`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const cartItems = useAppSelector(state => state.cart.items);
  const cartTotal = useAppSelector(state => state.cart.total);
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <HeaderContainer>
      <Container>
        <Logo onClick={() => handleNavigation('/')}>
          🎸 Guitar Shop
        </Logo>
        
        <Nav>
          <NavLink 
            active={isActive('/')} 
            onClick={() => handleNavigation('/')}
          >
            Home
          </NavLink>
          <NavLink 
            active={isActive('/catalog')} 
            onClick={() => handleNavigation('/catalog')}
          >
            Catalog
          </NavLink>
          <NavLink 
            active={isActive('/contact')} 
            onClick={() => handleNavigation('/contact')}
          >
            Contact
          </NavLink>
        </Nav>
        
        <RightSection>
          <CartSection>
            <CartInfo data-testid="cart-total">
              <div style={{ fontWeight: '600' }}>${cartTotal.toFixed(2)}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
              </div>
            </CartInfo>
            <CartButton 
              size="small"
              onClick={() => handleNavigation('/cart')}
              data-testid="cart-button"
            >
              🛒 Cart
              {itemsCount > 0 && <CartBadge data-testid="cart-badge">{itemsCount}</CartBadge>}
            </CartButton>
          </CartSection>

          <UserSection>
            {isAuthenticated && user ? (
              <>
                <UserInfo>
                  <WelcomeText>Welcome back,</WelcomeText>
                  <UserName>{user.firstName}</UserName>
                </UserInfo>
                <LogoutButton size="small" onClick={handleLogout}>
                  Logout
                </LogoutButton>
              </>
            ) : (
              <AuthButton 
                size="small"
                onClick={() => handleNavigation('/auth')}
              >
                Login
              </AuthButton>
            )}
          </UserSection>
        </RightSection>
      </Container>
    </HeaderContainer>
  );
};