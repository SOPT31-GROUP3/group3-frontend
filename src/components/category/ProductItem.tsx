import { iconPageArrowLeft, iconPageArrowRight } from 'assets/icons';
import ProductWithProps from 'components/common/ProductWithProps';
import { getCategoryItemList } from 'libs/api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CategoryItem } from 'types/types';

function ProductItem() {
  const [categoryItemList, setCategoryItemList] = useState<CategoryItem[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = [1, 2, 3, 4, 5];
  useEffect(() => {
    getCategoryItemData();
  }, [currentPage]);

  const getCategoryItemData = async () => {
    const data = await getCategoryItemList({ page: currentPage, limit: 4 });
    setCategoryItemList(data);
  };

  return (
    <>
      <div>
        {categoryItemList?.map((item) => (
          <ProductWithProps
            key={item.productId}
            productName={item.productName}
            productImage={item.productImage}
            discount={item.discount}
            originalPrice={item.originalPrice}
            discountedPrice={item.discountedPrice}
            reviewCount={item.reviewCount}
          />
        ))}
      </div>
      <Pagination>
        <PaginationButton
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1);
          }}
          isActive={false}
        >
          <img src={iconPageArrowLeft} alt='왼쪽 페이지' />
        </PaginationButton>
        {pageNumber.map((page) => (
          <PaginationButton
            onClick={() => setCurrentPage(page)}
            key={page}
            isActive={currentPage === page}
          >
            {page}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => {
            if (currentPage === 3) return;
            setCurrentPage(currentPage + 1);
          }}
          isActive={false}
        >
          <img src={iconPageArrowRight} alt='오른쪽 페이지' />
        </PaginationButton>
      </Pagination>
    </>
  );
}

export default ProductItem;

const Pagination = styled.div`
  height: 6.6rem;
  width: 37.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  background-color: ${(props) => props.theme.color.gray100};
  border-bottom: 0.1rem solid #dedede;
`;

const PaginationButton = styled.button<{ isActive: boolean }>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.2rem;
  border: 0.1rem solid ${(props) => props.theme.color.gray300};
  background-color: ${({ isActive }) => (isActive ? '#356BFF' : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  font-size: 1.4rem;
`;