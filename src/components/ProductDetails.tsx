import { FC } from 'react';
import { Product as ProductType } from './ProductTypes';

interface ProductDetailsProps {
  product: ProductType | null;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  
    if (!product) {
        return <div>Loading...</div>; // or display an error message
    }

    return (
      <div className="product-details-card">
        <h2>{product.name}</h2>
        <p>Price: {product.price} {product.currency}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
      </div>
    );
  };
  
  export default ProductDetails;