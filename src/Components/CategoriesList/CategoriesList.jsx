import React, { useEffect, useState } from 'react';
import style from './CategoriesList.module.css';
import { getCategories } from '../../Services/categories.service';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((res) => {
        const data = res.map((category) => {
          return category.name;
        });
        const sortedData = data.sort((a, b) => {
          return a.localeCompare(b);
        });
        setCategories(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //NOTE - Logica para scroll.
  const [activeLink, setActiveLink] = useState('');

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
    <div className={style.categories__container}>
      {categories.map((category) => {
        return (
          <span
            key={category}
            className={
              activeLink === category ? style.activeLink : style.category
            }
          >
            <a
              className={style.link}
              href="#Todas"
              onClick={(e) => handleScroll(e, category)}
            >
              {category}
            </a>
          </span>
        );
      })}
    </div>
  );
};

export default CategoriesList;
