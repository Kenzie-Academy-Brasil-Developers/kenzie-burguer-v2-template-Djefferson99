import { createContext, SetStateAction, useState, useEffect } from 'react';
import { IDefaultProviderProps } from './@types';
import { Api } from '../Api/axios';

export interface ICartProvider {
  setSearch: React.Dispatch<SetStateAction<string>>;
  listProduct: IProduct[];
  searchProduct: IProduct[];
}

interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
export const CartContext = createContext<ICartProvider>({} as ICartProvider);

export const CartProvider = ({ children }: IDefaultProviderProps) => {
  const [listProduct, setListProduct] = useState<IProduct[]>([]);
  const [search, setSearch] = useState('');

  const searchProduct = listProduct.filter((element) =>
    search === ''
      ? true
      : element.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function cartProducts() {
      try {
        const token = localStorage.getItem('@TOKEN');

        const res = await Api.get(`/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setListProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    cartProducts();
  }, []);

  return (
    <CartContext.Provider value={{ listProduct, setSearch, searchProduct }}>
      {children}
    </CartContext.Provider>
  );
};
