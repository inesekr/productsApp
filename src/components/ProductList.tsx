import React, { FC, useEffect, useState } from 'react';
import Product from './ProductListItem';
import { Product as ProductType } from './Product';
import { Link } from 'react-router-dom';
import { useProductContext } from './ProductContext';

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
    console.log('Search performed:', event.target.value);
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
      <div className="flex flex-wrap ml-10 mb-4 min-w-min">
        <input className="bg-gray-100 mr-4 mt-2 border border-solid border-gray-300 rounded-md p-2 text-lg focus:bg-white" 
          type="text"
          placeholder="Search by name..."
          value={nameSearchTerm}
          onChange={handleNameSearchChange}
        />
        
        <input className="bg-gray-100 mr-4 mt-2 border border-solid border-gray-300 rounded-md p-2 text-lg focus:bg-white"
          type="text"
          placeholder="Search by category..."
          value={categorySearchTerm}
          onChange={handleCategorySearchChange}
        />
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-link">
            <Product product={product} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button onClick={handleFirstPage} disabled={currentPage === 1} className={`border border-solid border-gray-300 py-2 px-4 mx-1  ${
      currentPage === 1 ? 'bg-gray-50' : 'hover:cursor-pointer bg-gray-200 '}`}>
          First
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`border border-solid border-gray-300 py-2 px-4 mx-1 ${
      currentPage === 1 ? 'bg-gray-50' : 'hover:cursor-pointer bg-gray-200'
    }`}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`border border-solid border-gray-300 py-2 px-4 mx-1 cursor-pointer ${
              currentPage === index + 1 ? 'bg-gray-300' : 'hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}  className={`border border-solid border-gray-300 py-2 px-4 mx-1 ${
      currentPage === totalPages ? 'bg-gray-50' : 'hover:cursor-pointer bg-gray-200'
    }`}>
          Next
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}  className={`border border-solid border-gray-300 py-2 px-4 mx-1 ${
      currentPage === totalPages ? 'bg-gray-50' : 'hover:cursor-pointer bg-gray-200'
    }`}>
          Last
        </button>
      </div>
    </div>
  );
};

export default ProductList;
