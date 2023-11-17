import {FC} from 'react';
import { Product } from './Product';

interface ProductProps {
  product: Product;
}

const ProductListItem: FC<ProductProps> = ({ product  }) => {
    return (
      <div className="border border-solid border-gray-300 rounded-lg p-5 m-5 w-48 text-center no-underline text-black inline-block align-top transition duration-300 bg-yellow-100 hover:bg-yellow-200" >
        <h3 className="text-xl font-bold mb-2 text-yellow-800">{product.name}</h3>
        <p>Price: {product.price} {product.currency}</p>
        <p>Category: {product.category}</p>
      </div>
    );
};
  
export default ProductListItem;
