import { useEffect } from 'react';
import css from './ModalErrorCommon.module.css';

export default function ModalErrorCommon({ isopen, onClose, children }) {
  // Закриття по Escape
  useEffect(() => {
    // Закриття по Escape
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isopen) {
      // disable scroll
      document.body.style.overflow = 'hidden';
      // add esc listener
      document.addEventListener('keydown', handleKeyDown);
    } else {
      // re-enable scroll
      document.body.style.overflow = '';
    }

    return () => {
      // cleanup: re-enable scroll, esc
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isopen, onClose]);

  if (!isopen) return null;
  return (
    <>
      <div className={css.backdrop} onClick={onClose}></div>
      <div className={css.wrap} onClick={e => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <svg className={css.icon} width={24} height={24} stroke="black">
            <use href={'/icons.svg#icon-close'}></use>
          </svg>
        </button>
        {children}
      </div>
    </>
  );
}
