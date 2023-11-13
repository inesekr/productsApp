import {FC} from 'react';
import { Product as ProductType } from './ProductTypes';

interface ProductProps {
  product: ProductType;
}

const Product: FC<ProductProps> = ({ product  }) => {
    return (
      <div className="product-card" >
        <h3>{product.name}</h3>
        <p>Price: {product.price} {product.currency}</p>
        <p>Category: {product.category}</p>
      </div>
    );
};
  
export default Product;
