import { IDefaultProviderProps } from './@types';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';

const Providers = ({ children }: IDefaultProviderProps) => (
  <CartProvider>
    <UserProvider>{children}</UserProvider>
  </CartProvider>
);

export default Providers;
