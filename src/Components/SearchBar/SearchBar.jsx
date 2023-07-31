import React, { useContext, useEffect, useState } from 'react';
import style from './SearchBar.module.css';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { SearchContext } from '../Context/SearchContext';

const SearchBar = () => {
  const { searchString, setSearchString } = useContext(SearchContext);

  const [activeLink, setActiveLink] = useState('');

  // Función para manejar el efecto de enlace activo
  const scrollActive = () => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 250;
      const sectionId = section.getAttribute('id');

      if (
        window.scrollY > sectionTop &&
        window.scrollY <= sectionTop + sectionHeight
      ) {
        setActiveLink(sectionId);
      }
    });
  };

  // Agregar el controlador de eventos "scroll" al montar el componente
  useEffect(() => {
    window.addEventListener('scroll', scrollActive);
  }, []);

  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -105;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={style.searchInput__container}>
        <RxMagnifyingGlass
          style={{
            fontSize: '28px',
          }}
        />
        <input
          style={{
            fontSize: '16px',
          }}
          className={style.searchInput}
          value={searchString}
          type="text"
          placeholder="Papas, batata..."
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      <span className={style.Categories}>
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/small/16/categorize.png"
          alt="categorize"
        />
        <a
          className={activeLink === 'Todas' ? style.activeLink : style.link}
          href="#Todas"
          onClick={(e) => handleScroll(e, 'Todas')}
        >
          Todas
        </a>
        |{' '}
        <a
          className={activeLink === 'Frutas' ? style.activeLink : style.link}
          href="#Frutas"
          onClick={(e) => handleScroll(e, 'Frutas')}
        >
          Frutas
        </a>
        |{' '}
        <a
          href="#Verduras"
          className={activeLink === 'Verduras' ? style.activeLink : style.link}
          onClick={(e) => handleScroll(e, 'Verduras')}
        >
          Verduras
        </a>
        |{' '}
      </span>
    </>
  );
};

export default SearchBar;
