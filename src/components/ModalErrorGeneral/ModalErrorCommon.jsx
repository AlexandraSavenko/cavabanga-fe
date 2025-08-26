import css from "./ModalErrorCommon.module.css";

export default function ModalErrorCommon({ isopen, onClose,
  children
}) {
  if (!isopen) return null;
  return ( <>
    <div className={css.backdrop} onClick={onClose}></div>
      <div className={css.wrap} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <svg className={css.icon}>
            <use href={`./icons.svg#icon-close`}></use>
          </svg>
      </button>
      {/* <p>WORKING</p> */}
        {children}
      </div>
    </>
  );
};
