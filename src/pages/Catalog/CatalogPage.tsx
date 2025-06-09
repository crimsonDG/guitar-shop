import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GuitarCard } from '../../components/UI/GuitarCard';
import { Button } from '../../components/UI/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setGuitars, setLoading, setError, setSelectedCategory, setSearchQuery } from '../../store/slices/guitarSlice';
import { guitarService } from '../../services/guitarService';
import type { GuitarCategory, Guitar } from '../../types/guitar';

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
  padding: 40px 20px;
  width: 100%;
`;

const FiltersSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 24px;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const PriceInputs = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 100px;
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
`;

const ResultsSection = styled.section``;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ResultsCount = styled.span`
  color: #6b7280;
  font-size: 16px;
`;

const GuitarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
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
  border-radius: 12px;
  margin: 24px 0;
`;

const ErrorButton = styled(Button)`
  margin-top: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #6b7280;
  background: white;
  border-radius: 12px;
`;

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { guitars, loading, error, selectedCategory, searchQuery } = useAppSelector(state => state.guitars);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [filteredGuitars, setFilteredGuitars] = useState<Guitar[]>(guitars);

  const categories: { value: GuitarCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Guitars' },
    { value: 'electric', label: 'Electric' },
    { value: 'acoustic', label: 'Acoustic' },
    { value: 'classical', label: 'Classical' },
    { value: 'bass', label: 'Bass' }
  ];

  const loadGuitars = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await guitarService.getAllGuitars();
      dispatch(setGuitars(data));
    } catch (err) {
      console.error('Error loading guitars:', err);
      dispatch(setError('Error loading guitars'));
    }
  }, [dispatch]);

  const applyFilters = useCallback(() => {
    let filtered = [...guitars];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(guitar => guitar.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(guitar => 
        guitar.name.toLowerCase().includes(query) ||
        guitar.brand.toLowerCase().includes(query) ||
        guitar.model.toLowerCase().includes(query)
      );
    }

    // Price filter
    if (minPrice) {
      filtered = filtered.filter(guitar => guitar.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(guitar => guitar.price <= parseInt(maxPrice));
    }

    setFilteredGuitars(filtered);
  }, [guitars, selectedCategory, searchQuery, minPrice, maxPrice]);

  useEffect(() => {
    loadGuitars();
  }, [loadGuitars]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearchQuery));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryChange = (category: GuitarCategory | 'all') => {
    dispatch(setSelectedCategory(category));
  };

  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleClearFilters = () => {
    dispatch(setSelectedCategory('all'));
    dispatch(setSearchQuery(''));
    setLocalSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Title>Guitar Catalog</Title>
            <Subtitle>Explore our complete collection</Subtitle>
          </HeaderContent>
        </Header>
        <MainContent>
          <LoadingSpinner>Loading guitars...</LoadingSpinner>
        </MainContent>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Title>Guitar Catalog</Title>
            <Subtitle>Explore our complete collection</Subtitle>
          </HeaderContent>
        </Header>
        <MainContent>
          <ErrorMessage>
            {error}
            <br />
            <ErrorButton onClick={loadGuitars}>
              Try Again
            </ErrorButton>
          </ErrorMessage>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Guitar Catalog</Title>
          <Subtitle>Explore our complete collection of premium guitars</Subtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <FiltersSection>
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Search Guitars</FilterLabel>
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Search by name, brand, or model..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={handleSearch}>Search</Button>
              </SearchContainer>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Price Range</FilterLabel>
              <PriceInputs>
                <PriceInput
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span>-</span>
                <PriceInput
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </PriceInputs>
            </FilterGroup>

            <FilterGroup>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </FilterGroup>
          </FiltersGrid>

          <CategoryFilters>
            {categories.map(category => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'primary' : 'outline'}
                size="small"
                onClick={() => handleCategoryChange(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </CategoryFilters>
        </FiltersSection>

        <ResultsSection>
          <ResultsHeader>
            <ResultsCount>
              Showing {filteredGuitars.length} of {guitars.length} guitars
            </ResultsCount>
          </ResultsHeader>

          {filteredGuitars.length === 0 ? (
            <EmptyState>
              <h3>No guitars found</h3>
              <p>Try adjusting your filters or search query</p>
              <Button onClick={handleClearFilters} style={{ marginTop: '16px' }}>
                Clear All Filters
              </Button>
            </EmptyState>
          ) : (
            <GuitarGrid>
              {filteredGuitars.map(guitar => (
                <GuitarCard
                  key={guitar.id}
                  guitar={guitar}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </GuitarGrid>
          )}
        </ResultsSection>
      </MainContent>
    </Container>
  );
};