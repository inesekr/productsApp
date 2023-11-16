import { FC } from 'react';
import { Product } from './Product';

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  
    if (!product) {
        return <div>Loading...</div>; 
    }

    return (
      <div className="product-details-card border border-solid border-gray-300 rounded-lg p-4 m-4 w-96 text-center no-underline text-black inline-block align-top bg-yellow-100">
        <h2>{product.name}</h2>
        <p>Price: {product.price} {product.currency}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
      </div>
    );
  };
  
  export default ProductDetails;