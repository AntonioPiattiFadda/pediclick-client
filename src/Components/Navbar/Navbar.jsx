import CartWidget from '../CartWidget/CartWidget';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';

const Navbar = () => {
  // useEffect(() => {
  //   const itemCollection = collection(db, 'category');
  //   getDocs(itemCollection).then((res) => {
  //     let newCategories = res.docs.map((category) => {
  //       return {
  //         ...category.data(),
  //         id: category.id,
  //       };
  //     });
  //     let firstCategory = newCategories.find(
  //       (category) => category.title === 'Todas'
  //     );
  //     let otherCategories = newCategories.filter(
  //       (category) => category.title !== 'Todas'
  //     );
  //     setCategories([firstCategory, ...otherCategories]);
  //   });
  // }, []);

  return (
    <div className={styles.navbar__container}>
      <a href="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8nWPb3DyHkw5qoJBwFH-xJzpVRhUNL8zdJUM-nQ5Wy8kpSc5iv70wO-_4bmqAvdsJBA&usqp=CAU"
          alt="Logo"
          className={styles.LogoPrincipal}
        />
      </a>
      <SearchBar />
      {/* <div className={styles.navbar__right}>
        <ul className={styles.navbar__uList}>
          {' '}
          {categories.map((category) => {
            return (
              <li key={category.id} className={styles.navbar__listItem}>
                {' '}
                <Link href={category.path} className={styles.navbar__link}>
                  {' '}
                  {category.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div> */}
      <CartWidget />
    </div>
  );
};

export default Navbar;
