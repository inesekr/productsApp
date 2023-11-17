import './index.css'; 
import {FC} from 'react';
import  {BrowserRouter, Routes, Route}  from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetailsWrapper from './components/ProductDetailsWrapper';
import { ProductProvider } from './components/ProductContext';

const App: FC = () => {
  return (
    <>
    <h1 className="text-3xl font-bold text-yellow-800 underline p-5">Products App</h1>
    <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}/>
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
      </Routes>
    </BrowserRouter>
    </ProductProvider>
    </>
   );
};

export default App;