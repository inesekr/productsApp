import React, { FC, useEffect, useState } from 'react';
import Product from './Product';
import { Product as ProductType } from './ProductTypes';
import { Link } from 'react-router-dom';
import { useProductContext } from './ProductContext';
import '../styles/Product.css';

const PAGE_SIZE = 12; // Number of products per page

const ProductList: FC = () => {
  const { products: allProducts } = useProductContext();
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(allProducts);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const filtered = allProducts
      .filter((product) =>
        product.name.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&
        product.category.toLowerCase().includes(categorySearchTerm.toLowerCase())
      );

    setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    setFilteredProducts(filtered.slice(startIndex, startIndex + PAGE_SIZE));
  }, [nameSearchTerm, categorySearchTerm, currentPage, allProducts]);

  const handleNameSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleCategorySearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
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

      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </div>
  );
};

export default ProductList;
