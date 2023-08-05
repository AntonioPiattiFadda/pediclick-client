import { useContext, useEffect, useState } from 'react';
import styles from './PromotionedProducts.module.css';
import { getProducts } from '../../Services/products.service';
import { Link } from 'react-router-dom';
import { SearchContext } from '../Context/SearchContext';
import { PromoProductsSkeleton } from '../../Utils/Skeletons';

const PromotionedProducts = () => {
  const [items, setItems] = useState([]);

  const { searchString } = useContext(SearchContext);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const mappedProducts = res.map((product) => {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            category: product.category.name,
            blocked: product.blocked,
          };
        });
        setItems(mappedProducts.slice(1, 8));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (searchString !== '') {
    return;
  }

  return (
    <>
      <section
        style={{
          width: '100%',
        }}
        id="Todas"
      >
        {items.length === 0 ? (
          <>
            <span className={styles.PromoTittle}>
              Promo | Promo | Promo | Promo | Promo | Promo | Promo
            </span>
            <PromoProductsSkeleton />
          </>
        ) : (
          <span className={styles.PromoTittle}>
            Promo | Promo | Promo | Promo | Promo | Promo | Promo
          </span>
        )}
        <div className={styles.PromoContainer}>
          {items.map((item) => {
            return (
              <Link
                key={item.name}
                to={`/itemDetail/${item.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  width: '180px',
                }}
              >
                <div className={styles.PromoCard}>
                  <div className={styles.PromoCardImageContainer}>
                    <img
                      className={styles.PromoCardImage}
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className={styles.PromoCardInfo}>
                    <span>{item.name}</span>
                    <span className={styles.PromoCardPrice}>${item.price}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default PromotionedProducts;
