import {FC} from 'react';
import  {BrowserRouter, Routes, Route}  from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetailsWrapper from './components/ProductDetailsWrapper';
import { ProductProvider } from './components/ProductContext';

const App: FC = () => {
  return (
    <>
    <h1>Products App</h1>
    <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProductList />}
        />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
      </Routes>
    </BrowserRouter>
    </ProductProvider>
    </>
   );
};

export default App;


