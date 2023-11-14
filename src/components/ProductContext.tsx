import React, { createContext, useContext, FC, ReactNode, useState, useEffect} from 'react';
import { Product as ProductType } from './ProductTypes';
import axios from 'axios';

interface ProductContextProps {
  children: ReactNode;
}

interface ProductContextValue {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const ProductProvider: FC<ProductContextProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Fetch or set your products here
    const fetchData = async () => {
      try {
        const response = await axios.get('https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd');
        const productsArray = response.data.products || [];
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once


  const contextValue: ProductContextValue = {
    products,
    setProducts,
  };

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
