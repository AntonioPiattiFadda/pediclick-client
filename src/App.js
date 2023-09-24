import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer.jsx';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import styles from './index.module.css';
import CartContextProvider from './Components/Context/CartContext';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import SearchContextProvider from './Components/Context/SearchContext';
import FormCheckout from './Components/FormCheckout/FormCheckout';
import GoogleMapComponent from './Components/Maps/CalculateShipping';

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
              <Route path="/checkoutForm" element={<FormCheckout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartContextProvider>
        </SearchContextProvider>
        <Footer />
      </BrowserRouter>
      <div className={styles.bigScreen}>
        <div className={styles.modal}>
          <p>
            La aplicación no es compatible con resoluciones tan grandes. Por
            favor, reduzca el tamaño de la ventana del navegador.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
