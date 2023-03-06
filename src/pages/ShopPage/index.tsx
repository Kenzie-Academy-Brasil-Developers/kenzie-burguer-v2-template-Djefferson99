// import { useContext } from 'react';
import { StyledShopPage } from './style';
// import { CartContext } from '../../Providers/CartContext';
//import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import { StyledContainer } from '../../styles/grid';

const ShopPage = () => {
  // const { cartProducts } = useContext(CartContext);
  // cartProducts();
  console.log('fopoi');
  return (
    <StyledShopPage>
      {/* <CartModal /> */}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
