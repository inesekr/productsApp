import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import { Product as ProductType } from './ProductTypes';
import { useNavigate } from 'react-router-dom';
import '../styles/Product.css';

const ProductList:FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd');
          const productsArray = response.data.products || []; 
          setProducts(productsArray);            
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    const handleProductClick = (product: ProductType) => {
      // Navigate to ProductDetails with the product ID included in the URL
      navigate(`/product/${product.id}`, { state: { product } });
    };
    
    return (
      <div className="product-list-container">
        {products.map((product) => (
        <div key={product.id} className="product-link" onClick={() => handleProductClick(product)}>
          <Product product={product} />
        </div>
      ))}
         
      </div>
    );
  
  };
  
  export default ProductList;
  