import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import { Product as ProductType } from './ProductTypes';
import { Link } from 'react-router-dom';
import { useProductContext } from './ProductContext';
import '../styles/Product.css';

const ProductList: FC = () => {
  const { products: allProducts } = useProductContext();
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(allProducts);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      // Filter products based on the search term
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&  product.category.toLowerCase().includes(categorySearchTerm.toLowerCase())
      );

      setFilteredProducts(filtered);
    }, 300); // Adjust the delay time as needed

    return () => clearTimeout(delayedSearch); // Cleanup the timeout on component unmount or when the search term changes
  }, [nameSearchTerm, categorySearchTerm, allProducts]);

  const handleNameSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearchTerm(event.target.value);
  };

  const handleCategorySearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="input-container">
      <input className="input-field"
        type="text"
        placeholder="Search by name..."
        value={nameSearchTerm}
        onChange={handleNameSearchChange}
      />
      <div className="or-separator">
        <p>or</p>
      </div>
      <input className="input-field"
        type="text"
        placeholder="Search by category..."
        value={categorySearchTerm}
        onChange={handleCategorySearchChange}
      />
      </div>
      

      <div className="product-list-container">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-link">
            <Product product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
