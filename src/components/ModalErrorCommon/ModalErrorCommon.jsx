import css from "./ModalErrorCommon.module.css";

export default function ModalErrorCommon({ isopen, onClose,
  children
}) {
  if (!isopen) return null;
  return ( <>
    <div className={css.backdrop} onClick={onClose}></div>
      <div className={css.wrap} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <svg className={css.icon} width={24} height={24} stroke="black">
            <use href={'/icons.svg#icon-close'}></use>
          </svg>
      </button>
        {children}
      </div>
    </>
  );
};
