import {FC} from 'react';
import  {BrowserRouter, Routes, Route}  from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetailsWrapper from './components/ProductDetailsWrapper';

import './App.css';

const App: FC = () => {

  return (
 
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProductList />}
        />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
       
      </Routes>
    </BrowserRouter>
    
   );
};

export default App;


