/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import {
  fetchAllCategories,
  fetchCatalog,
  fetchCategory,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Card from '../../components/card/card';
import { Product } from '../../components/card/types';
import { StyledCardsWrapper } from '../welcome/style';
import {
  StyledCatalogFilterBar,
  StyledCatalogWrapper,
  StyledCategoryButtonWrapper,
} from './style';
import { StyledCardBtn } from '../../components/card/style';
import { Category } from '../../features/products/productsType';

export default function Catalog() {
  const dispatch = useAppDispatch();
  const cardsData = useAppSelector((state) => state.products.cardData);
  const categoriesData = useAppSelector((state) => state.products.categories);

  const [categoryId, setCategoryId] = useState<string | null>(null);

  function getCurrentId(id: string) {
    return function newFunc() {
      setCategoryId(id);
    };
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchCatalog());
  }, []);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategory(categoryId));
    }
  }, [categoryId]);

  return (
    <StyledCatalogWrapper>
      <StyledCatalogFilterBar>
        {categoriesData.map(({ key, id }: Category) => (
          <StyledCategoryButtonWrapper key={key}>
            <StyledCardBtn $primary onClick={getCurrentId(id)}>
              {key.split('-').reverse().join(' ').toUpperCase()}
            </StyledCardBtn>
          </StyledCategoryButtonWrapper>
        ))}
      </StyledCatalogFilterBar>

      <StyledCardsWrapper>
        {cardsData.map((product: Product) => (
          <Card product={product} key={product.id} />
        ))}
      </StyledCardsWrapper>
    </StyledCatalogWrapper>
  );
}
