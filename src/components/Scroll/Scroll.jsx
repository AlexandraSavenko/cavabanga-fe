import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectPage } from '../../redux/recipes/selectors';

import style from './Scroll.module.css';

const Scroll = ({ containerRef }) => {
  const currentPage = useSelector(selectPage);

  // автоскрол при зміні сторінки
  useEffect(() => {
    if (containerRef.current) {
      const y =
        containerRef.current.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentPage]);

  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offset = window.innerWidth - rect.right + 1; // 1px відступ від правої межі контейнера
        document.documentElement.style.setProperty(
          '--scroll-btn-right',
          `${offset}px`
        );
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [containerRef]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <>
      <button
        className={style.scrollBtn}
        onClick={scrollToTop}
        style={{ top: '70%' }}
      >
        <svg className={style.iconUp}>
                            <use href={`/icons.svg#icon-pagination-backwards`}></use>
                          </svg>
      </button>
      <button
        className={style.scrollBtn}
        onClick={scrollToBottom}
        style={{ top: '80%' }}
      >
       <svg className={style.iconDown}>
                            <use href={`/icons.svg#icon-pagination-backwards`}></use>
                          </svg>
      </button>
    </>
  );
};

export default Scroll;
