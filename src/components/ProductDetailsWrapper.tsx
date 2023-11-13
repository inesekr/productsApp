import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';
import { Product as ProductType } from './ProductTypes';

const ProductDetailsWrapper: FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd/`);
        const productsArray = response.data.products || []; 
        const selectedProduct = productsArray.find((p: ProductType) => String(p.id) === id);
        setProduct(selectedProduct || null);   
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return <ProductDetails product={product} />;
};

export default ProductDetailsWrapper;
