import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer.jsx';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import styles from './index.module.css';
import Form from './Components/Form/Form';
import CartContextProvider from './Components/Context/CartContext';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import SearchContextProvider from './Components/Context/SearchContext';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <SearchContextProvider>
          <CartContextProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route
                path="/category/:categoryName"
                element={<ItemListContainer />}
              />
              <Route
                path="/ItemSearch/:searchedItem"
                element={<ItemListContainer />}
              />
              <Route path="/itemDetail/:id" element={<ItemDetailContainer />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/formulario" element={<Form />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartContextProvider>
        </SearchContextProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
