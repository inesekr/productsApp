import { FC  } from 'react';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';
import { Product as ProductType } from './Product';
import { useProductContext } from './ProductContext';

const ProductDetailsWrapper: FC = () => {
    const { id } = useParams();

    const { products } = useProductContext();
    const selectedProduct = products.find((p: ProductType) => String(p.id) === id);
   
    return <ProductDetails product={selectedProduct || null} />;
};

export default ProductDetailsWrapper;
